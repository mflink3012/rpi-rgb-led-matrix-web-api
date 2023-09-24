import { AbstractImageRenderConfig } from "../abstracts/AbstractImageRenderConfig";

export class StaticImageRenderConfig extends AbstractImageRenderConfig {
    time: number = 3; // seconds

    constructor() {
        super();
        this.modelType = 'StaticImageRenderConfig';
        Object.setPrototypeOf(this, StaticImageRenderConfig.prototype);
    }
};
