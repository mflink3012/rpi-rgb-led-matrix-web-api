import { RenderConfig } from "./RenderConfig";

export abstract class TextRenderConfig extends RenderConfig {
    font: string = '4x6';
    text: string = 'n/a';
    color: string = 'ffffffff'; // white
    spacing: number = 1;

    constructor() {
        super();
        this.modelType = 'TextRenderConfig';
        Object.setPrototypeOf(this, TextRenderConfig.prototype);
    }
};
