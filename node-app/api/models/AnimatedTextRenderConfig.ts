import { AbstractTextRenderConfig } from "../abstracts/AbstractTextRenderConfig";

export class AnimatedTextRenderConfig extends AbstractTextRenderConfig {
    blinkSpeed: number = 5; // pixels
    direction: string = 'south'; // out of (south,west,north,east)
    loops: number = 1;

    constructor() {
        super();
        this.modelType = 'AnimatedTextRenderConfig';
        Object.setPrototypeOf(this, AnimatedTextRenderConfig.prototype);
    }
};