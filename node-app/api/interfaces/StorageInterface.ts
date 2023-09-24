import { Model } from "../abstracts/Model";

export interface ModelStorageInterface<M extends Model> {
    save(models: Object): boolean;
    load(): Object;
}