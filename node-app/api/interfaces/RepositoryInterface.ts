import { Model } from "../models/Model";

/**
 * @interface
 */
export interface RepositoryInterface<M extends Model> {
    /**
     * Checks for existance of one model with `id`.
     * 
     * @param id The identifier of the model to check for existance.
     * 
     * @returns `true`, if there is a model with this `id` in the current repository. `false`, if it is not existant.
     */
    contains(id: string): boolean;

    /**
     * Creates a new model in this repository.
     * 
     * @param model The new model to save in this repository.
     * @param [preserveFields=[]] Optional. Take over the values of the fields specified here from the provided model.
     *                            Otherwise `id`, `created` and `version` will be generated. Possible values `'id', 'created', 'version'`.
     * 
     * @returns The model saved in the repository. **Is not necessary identical in object and/or content with the provided model!
     *          So take the resulting object to work with the latest version of the provided model.**
     * 
     * @throws `Error`, if there is already a model with the `id` in this repository.
     */
    create(model: M, preserveFields: Array<string>): M;

    /**
     * Read a specific model from this repository.
     * 
     * @param id The identifier of the model to read.
     * @param [missingOk=true] Optional. No `Error` will be thrown, if this parameter is `true` (default) and the model doesn't exist, but `null` will
     *                         be returned. If this parameter is `false` and the requested model doesn't exists, an `Error` will be thrown.
     * 
     * @returns The found model or `null`, if not found/existant.
     * 
     * @throws `Error`, if `missingOk` is set to `false` and there is no model with the provided `id` in this repository.
     */
    read(id: string, missingOk: boolean): M;

    /**
     * Read all models in this repository at once.
     * 
     * @returns An `Object` with all stored models as key-value-pair. The key is represented by the `id` in each corresponding model.
     *          An empty object (`Object.getOwnPropertyNames(...).length == 0`), if the repository is empty.
     */
    readAll(): Object;

    /**
     * Updates (or creates) an existing model in this repository. The existing model will be identified by `id` in the provided model.
     * 
     * @param model The model to update in this repository.
     * @param createIfMissing Throws an `Error`, if this parameter is set to `false` and there is no model with the provided `id`.
     *                        If set to `true`, a new object will be created. 
     * 
     * @returns The model saved in the repository. **Is not necessary identical in object and/or content with the provided model!
     *          So take the resulting object to work with the latest version of the provided model.**
     * 
     * @throws `Error`, only if `createIfMissing` is set to `true` and one of:
     *          - the provided model has no `id` set 
     *          - there is no model with the `id` in this repository
     *          - there is an error while calling `create`
     */
    update(model: M, createIfMissing: boolean): M;

    /**
     * Deletes the model with the provided `id` from this repository.
     * 
     * @param id The `id` of the model to delete in this repository.
     * @param missingOk No `Error` will be thrown, if this parameter is `true` and the model doesn't exist, but `false` will
     *                  be returned. If this parameter is `false` and the desired model doesn't exists, an `Error` will be thrown.
     * 
     * @returns `true`, if there was a model to delete. `false`, if there was no model with the provided `id`.
     * 
     * @throws `Error`, only if `missingOk` is set to `false` and there is no model with the `id` in this repository.
     */
    delete(id: string, missingOk: boolean): boolean;

    /**
     * Deletes all existing models in this repository.
     */
    deleteAll(): void;
};