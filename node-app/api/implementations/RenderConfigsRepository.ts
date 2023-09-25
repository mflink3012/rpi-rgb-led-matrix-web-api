import { ModelRepository } from "../abstracts/ModelRepository";
import { RenderConfig } from "../abstracts/RenderConfig";
import { ModelStorageInterface } from "../interfaces/StorageInterface";
import { RenderConfigRegistry } from "../models/RenderConfigRegistry";

export class RenderConfigsRepository extends ModelRepository<RenderConfig> {
    constructor(storage :ModelStorageInterface<RenderConfig>) {
        super(RenderConfigRegistry, storage);
        Object.setPrototypeOf(this, RenderConfigsRepository.prototype);
    }
};