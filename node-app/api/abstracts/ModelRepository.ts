import { RepositoryInterface } from "../interfaces/RepositoryInterface";
import { Model } from "./Model";
import { v4 as uuidv4 } from "uuid";
import semaphore from "semaphore";
import { sha256 } from "js-sha256";
import { ModelStorageInterface } from "../interfaces/StorageInterface";
import { NoOpModelStorage } from "../implementations/NoOpModelStorage";
import { ModelRegistry } from "../interfaces/ModelRegistry";

/**
 * An abstract class for handling models in a repository with transaction-awareness on modification operations (create, update, delete).
 * 
 * @abstract
 * @extends Object
 * @implements {RepositoryInterface}
 */
export abstract class ModelRepository<M extends Model> extends Object implements RepositoryInterface<M> {
    /** Semaphore to enable transaction-save operations. */
    private readonly SEMAPHORE: semaphore.Semaphore = semaphore(1);
    /** The data of this repository. */
    protected models: Object = {};
    protected static readonly BLACKLISTED_FIELDS_IN_UPDATE = ['id', 'version', 'created', 'updated', 'hash', 'modelType'];
    protected storage: ModelStorageInterface<M> = new NoOpModelStorage();
    protected registry: ModelRegistry;

    constructor(registry: ModelRegistry, storage: ModelStorageInterface<M> = null) {
        super();
        Object.setPrototypeOf(this, ModelRepository.prototype);
        this.registry = registry;

        if (storage && storage !== null) {
            this.storage = storage;
        }

        this.models = this.storage.load();
    }

    /**
     * Checks for existance of one model with `id`.
     * 
     * *Important: This function is not synchronized. Multiple asychnronous and concurrent calls to this function might give different results,
     * if the model is deleted meanwhile/not created at this time.*
     * 
     * @param id The identifier of the model to check for existance.
     * 
     * @returns `true`, if there is a model with this `id` in the current repository. `false`, if it is not existant.
     * 
     * @override
     */
    public contains(id: string): boolean {
        return this.models.hasOwnProperty(id);
    }

    /**
     * Creates a new model in this repository.
     * 
     * *Note: This function is synchronized at the point of creating an ID, checking for duplicates and saving the new model.
     * Multiple asynchronous and concurrent calls will not create multiple models with the same ID.*
     * 
     * @param model The new model to save in this repository.
     * @param [preserveFields=[]] Optional. Take over the values of the fields specified here from the provided model.
     *                            Otherwise `id`, `created` and `version` will be generated. Possible values `'id', 'created', 'version'`.
     * 
     * @returns The model saved in the repository. **Is not necessary identical in object and/or content with the provided model!
     *          So take the resulting object to work with the latest version of the provided model.**
     * 
     * @throws `Error`, if there is already a model with the `id` in this repository.
     * 
     * @override
     */
    public create(model: M, preserveFields: Array<string> = []): M {
        let newModel = this.createModel(model);

        if (!preserveFields.includes('id') || !model.id || model.id === null) {
            this.transaction(() => {
                newModel.id = uuidv4();
            });
        }

        if (!preserveFields.includes('created') || !model.created || model.created === null) {
            newModel.created = new Date().toISOString();
        }

        if (!preserveFields.includes('version') || !model.version || model.version === null) {
            newModel.version = 1;
        }

        newModel.hash = this.createHash(model);

        this.transaction(() => {
            if (this.contains(newModel.id)) {
                throw new Error(`There is already one model with id ${newModel.id} in this repository!`)
            }

            this.models[newModel.id] = newModel;
            this.storage.save(this.models);
        });

        let result = this.read(newModel.id);

        return result;
    }

    /**
     * Read a specific model from this repository.
     * 
     * *Important: This function is not synchronized. Multiple asychnronous and concurrent calls to this function might give different results,
     * if the model is deleted meanwhile/not created at this time.*
     * 
     * @param id The identifier of the model to read.
     * @param [missingOk=true] Optional. No `Error` will be thrown, if this parameter is `true` (default) and the model doesn't exist, but `null` will
     *                         be returned. If this parameter is `false` and the requested model doesn't exists, an `Error` will be thrown.
     * 
     * @returns The found model or `null`, if not found/existant.
     * 
     * @throws `Error`, if `missingOk` is set to `false` and there is no model with the provided `id` in this repository.
     * 
     * @override
     */
    public read(id: string, missingOk: boolean = true): M {
        if (this.contains(id)) {
            return this.models[id];
        } else if (!missingOk) {
            throw new Error(`There is no model with id ${id} in this repository!`);
        }

        return null;
    }

    /**
     * Read all models in this repository at once.
     * 
     * *Important: This function is not synchronized. Multiple asychnronous and concurrent calls to this function might give different results,
     * if models are deleted meanwhile/not created at this time.*
     * 
     * @returns An `Object` with all stored models as key-value-pair. The key is represented by the `id` in each corresponding model.
     *          An empty object (`Object.getOwnPropertyNames(...).length == 0`), if the repository is empty.
     * 
     * @override
     */
    public readAll(): Object {
        return this.models;
    }

    /**
     * Updates (or creates) an existing model in this repository. The existing model will be identified by `id` in the provided model.
     * 
     * *Note: This function is synchronized at the point of checking for duplicates and saving the updated object.
     * Multiple asynchronous and concurrent calls will not update or create multiple models with the same ID at the same time.*
     * 
     * @param model The model to update in this repository.
     * @param [createIfMissing=false] Optional. Throws an `Error`, if this parameter is set to `false` (default)` and there is no model with the provided `id`.
     *                                If set to `true`, a new object will be created. 
     * 
     * @returns The model saved in the repository. **Is not necessary identical in object and/or content with the provided model!
     *          So take the resulting object to work with the latest version of the provided model.**
     * 
     * @throws `Error`, only if `createIfMissing` is set to `true` and one of:
     *          - the provided model has no `id` set 
     *          - there is no model with the `id` in this repository
     *          - there is an error while calling `create`
     * 
     * @override
     */
    public update(model: M, createIfMissing: boolean = false): M {
        if (!createIfMissing && (!model.id || model.id === null)) {
            throw new Error("Attribute 'id' is not set!");
        }

        if (this.contains(model.id)) {
            this.transaction(() => {
                let updatedModel: M = this.deepClone(this.models[model.id]);
                let existingModelHash: string = updatedModel.hash;

                ModelRepository.deepCopy(model, updatedModel);

                let updatedModelHash: string = this.createHash(updatedModel);

                // Avoid unnecessary updates. Reflect real updates only!
                if (updatedModelHash != existingModelHash) {
                    updatedModel.updated = new Date().toISOString();
                    updatedModel.version = updatedModel.version + 1;
                    updatedModel.hash = this.createHash(updatedModel);

                    this.models[updatedModel.id] = updatedModel;
                    this.storage.save(this.models);
                }
            });
        } else if (createIfMissing) {
            this.create(model);
        } else {
            throw new Error(`There is no model with id ${model.id} in this repository!`);
        }

        return this.read(model.id);

    }

    /**
     * Deletes the model with the provided `id` from this repository.
     * 
     * *Note: This function is synchronized at the point of deleting the model.
     * Multiple asynchronous and concurrent calls will not attempt to delete multiple times.*
     * 
     * @param id The `id` of the model to delete in this repository.
     * @param [missingOk=true] Optional. No `Error` will be thrown, if this parameter is `true` (default) and the model doesn't exist, but `false` will
     *                         be returned. If this parameter is `false` and the desired model doesn't exists, an `Error` will be thrown.
     * 
     * @returns `true`, if there was a model to delete. `false`, if there was no model with the provided `id`.
     * 
     * @throws `Error`, only if `missingOk` is set to `false` and there is no model with the `id` in this repository.
     * 
     * @override
     */
    public delete(id: string, missingOk: boolean = true): boolean {
        let exists = this.contains(id);

        if (exists) {
            this.transaction(() => {
                if (this.contains(id)) { // double check to avoid trying to delete already deleted model (in another thread).
                    delete this.models[id];
                    this.storage.save(this.models);
                }
            });
        } else if (!missingOk) {
            throw new Error(`There is no model with id ${id} in this repository!`);
        }

        return exists;

    }

    /**
     * Deletes all existing models in this repository.
     * 
     * @override
     */
    public deleteAll(): void {
        Object.getOwnPropertyNames(this.models).forEach(id => {
            this.delete(id);
        });
    }

    /**
     * Used to release the lock for manipulating operations in this repository.
     */
    protected unlock() {
        if (!this.SEMAPHORE.available(1)) {
            this.SEMAPHORE.leave();
        }
    }

    /**
     * Used to aquire a lock for manipulating operation in this repository.
     * **Important: Prefer `transaction` (automatic unlocking in all cases)! Know what you are doing,
     * if using `lock`! Be sensitive for deadlocks and take care for `unlock` in all cases!**
     * 
     * @param task The function to execute in the lock. Make sure to `unlock` as soon as possible in this function!
     */
    protected lock(task: semaphore.Task) {
        this.SEMAPHORE.take(task);
    }

    /**
     * Used to execute a transaction with manipulation operations in this repository.
     * 
     * @param task The function to execute in the transaction. This function ensures exclusive access to the data.
     *             Make sure this function contains transactional operations only/mainly and leave as soon as possible.
     */
    protected transaction(task: semaphore.Task) {
        try {
            this.lock(() => {
                task();
                this.unlock();
            });
        } catch (error) {
            this.unlock();
            throw error;
        } finally {
            // Just for safety!
            this.unlock();
        }
    }

    /**
     * Create a hash from the model. Excludes the attribute `hash`.
     * 
     * @param model The model to create the hash for.
     * 
     * @returns The hash-value for the provided model.
     */
    protected createHash(model: M): string {
        if (model === null) {
            return null;
        }

        // Save and reset model.hash
        let modelHash = model.hash;
        model.hash = null;

        let hash: string = sha256(JSON.stringify(model));

        // Restore model.hash
        model.hash = modelHash;
        return hash;
    }

    /**
     * Create a deep clone (copy all fields recursively into a new object) from the provided model.
     * 
     * @param model The model to clone.
     * 
     * @returns A deep clone of the model provided.
     */
    protected deepClone(model: M): M {
        return structuredClone(model);
    }

    protected createModel(sourceModel: M): M {
        if (!this.registry[sourceModel.modelType]) {
            throw Error(`${sourceModel.modelType} is not a valid modelType.`)
        }

        let model = new this.registry[sourceModel.modelType]();
        ModelRepository.deepCopy(sourceModel, model);
        return model;
    }

    /**
     * Copies all values from fields existing in target to the corresponding fields in target.
     * Fields not in target are ignored, fields in target but not in source are kept as is.
     * It will recurse on other objects and array, which shall be copied, in the same way.
     * 
     * @param source The source to copy the field-values from.
     * @param target The target, where to copy the values to.
     */
    protected static deepCopy(source: Object, target: Object): void {
        Object.getOwnPropertyNames(target).forEach(field => {
            if (!ModelRepository.BLACKLISTED_FIELDS_IN_UPDATE.includes(field) && source.hasOwnProperty(field)) {
                if (source[field] != null && Array.isArray(target[field])) {
                    target[field] = [];
                    source[field].forEach(value => {
                        let s: Object = { v: value };
                        let t: Object = { v: null };
                        this.deepCopy(s, t);
                        target[field].push(t['v']);
                    });
                } else if (source[field] != null && typeof(target[field]) == 'object') {
                    this.deepCopy(source[field], target[field]);
                } else {
                    target[field] = source[field];
                }
            }
        });
    }
};