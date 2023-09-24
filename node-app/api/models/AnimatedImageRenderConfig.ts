import { ImageRenderConfig } from "../abstracts/ImageRenderConfig";

export class AnimatedImageRenderConfig extends ImageRenderConfig {
    loops: number = 1;

    constructor() {
        super();
        this.modelType = 'AnimatedImageRenderConfig';
        Object.setPrototypeOf(this, AnimatedImageRenderConfig.prototype);
    }
};
