import { RenderConfig } from "../models/RenderConfig";
import { AbstractRepository } from "../abstracts/AbstractRepository";
import { ModelStorageInterface } from "../interfaces/StorageInterface";

export class RenderConfigsRepository extends AbstractRepository<RenderConfig> {
    constructor(storage :ModelStorageInterface<RenderConfig>) {
        super(storage);
        Object.setPrototypeOf(this, RenderConfigsRepository.prototype);
    }
};