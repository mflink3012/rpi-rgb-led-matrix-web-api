import { ModelRepository } from "../abstracts/ModelRepository";
import { RenderConfig } from "../abstracts/RenderConfig";
import { ModelStorageInterface } from "../interfaces/StorageInterface";

export class RenderConfigsRepository extends ModelRepository<RenderConfig> {
    constructor(storage :ModelStorageInterface<RenderConfig>) {
        super(storage);
        Object.setPrototypeOf(this, RenderConfigsRepository.prototype);
    }
};