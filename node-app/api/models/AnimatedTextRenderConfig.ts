import { TextRenderConfig } from "../abstracts/TextRenderConfig";

export class AnimatedTextRenderConfig extends TextRenderConfig {
    blinkSpeed: number = 5; // pixels
    direction: string = 'south'; // out of (south,west,north,east)
    loops: number = 1;

    constructor() {
        super();
        this.modelType = 'AnimatedTextRenderConfig';
        Object.setPrototypeOf(this, AnimatedTextRenderConfig.prototype);
    }
};