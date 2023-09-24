import { ImageRenderConfig } from "../abstracts/ImageRenderConfig";

export class StaticImageRenderConfig extends ImageRenderConfig {
    time: number = 3; // seconds

    constructor() {
        super();
        this.modelType = 'StaticImageRenderConfig';
        Object.setPrototypeOf(this, StaticImageRenderConfig.prototype);
    }
};
