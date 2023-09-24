import { Dimensions } from "../models/Dimensions";
import { AbstractRenderConfig } from "./AbstractRenderConfig";


export abstract class AbstractImageRenderConfig extends AbstractRenderConfig {
    dimensions: Dimensions = new Dimensions();
    image: string = 'media/images/test_64x64.bmp';

    constructor() {
        super();
        this.modelType = 'ImageRenderConfig';
        Object.setPrototypeOf(this, AbstractImageRenderConfig.prototype);
    }
};