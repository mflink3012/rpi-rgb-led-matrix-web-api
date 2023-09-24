import { ModelStorageInterface } from "../interfaces/StorageInterface";
import { AbstractModel } from "../abstracts/AbstractModel";

export class NoOpModelStorage<M extends AbstractModel> implements ModelStorageInterface<M> {
    save(models: Object): boolean {
        return true;
    }
    load(): Object {
        return {};
    }
}