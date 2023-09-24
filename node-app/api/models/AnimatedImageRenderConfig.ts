import { AbstractImageRenderConfig } from "../abstracts/AbstractImageRenderConfig";

export class AnimatedImageRenderConfig extends AbstractImageRenderConfig {
    loops: number = 1;

    constructor() {
        super();
        this.modelType = 'AnimatedImageRenderConfig';
        Object.setPrototypeOf(this, AnimatedImageRenderConfig.prototype);
    }
};
