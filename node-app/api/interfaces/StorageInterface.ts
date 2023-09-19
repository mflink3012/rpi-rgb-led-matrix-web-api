import { Model } from "../models/Model";

export interface ModelStorageInterface<M extends Model> {
    save(models: Object): boolean;
    load(): Object;
}