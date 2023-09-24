import { TextRenderConfig } from "../abstracts/TextRenderConfig";

export class StaticTextRenderConfig extends TextRenderConfig {
    time: number = 3; // seconds

    constructor() {
        super();
        this.modelType = 'StaticTextRenderConfig';
        Object.setPrototypeOf(this, StaticTextRenderConfig.prototype);
    }
};
