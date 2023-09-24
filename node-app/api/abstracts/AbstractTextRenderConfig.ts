import { AbstractRenderConfig } from "./AbstractRenderConfig";

export abstract class AbstractTextRenderConfig extends AbstractRenderConfig {
    font: string = '4x6';
    text: string = 'n/a';
    color: string = 'ffffffff'; // white
    spacing: number = 1;

    constructor() {
        super();
        this.modelType = 'StaticTextRenderConfig';
        Object.setPrototypeOf(this, AbstractTextRenderConfig.prototype);
    }
};
