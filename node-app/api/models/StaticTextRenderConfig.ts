import { AbstractTextRenderConfig } from "../abstracts/AbstractTextRenderConfig";

export class StaticTextRenderConfig extends AbstractTextRenderConfig {
    time: number = 3; // seconds

    constructor() {
        super();
        this.modelType = 'StaticTextRenderConfig';
        Object.setPrototypeOf(this, StaticTextRenderConfig.prototype);
    }
};
