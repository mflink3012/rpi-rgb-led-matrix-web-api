import { ModelStorageInterface } from "../interfaces/StorageInterface";
import { Model } from "../abstracts/Model";

export class NoOpModelStorage<M extends Model> implements ModelStorageInterface<M> {
    save(models: Object): boolean {
        return true;
    }
    load(): Object {
        return {};
    }
}