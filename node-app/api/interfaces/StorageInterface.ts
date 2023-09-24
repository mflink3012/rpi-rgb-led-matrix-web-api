import { AbstractModel } from "../abstracts/AbstractModel";

export interface ModelStorageInterface<M extends AbstractModel> {
    save(models: Object): boolean;
    load(): Object;
}