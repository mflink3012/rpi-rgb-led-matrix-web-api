import { Dimensions } from "../models/Dimensions";
import { RenderConfig } from "./RenderConfig";


export abstract class ImageRenderConfig extends RenderConfig {
    dimensions: Dimensions = new Dimensions();
    image: string = 'media/images/test_64x64.bmp';

    constructor() {
        super();
        this.modelType = 'ImageRenderConfig';
        Object.setPrototypeOf(this, ImageRenderConfig.prototype);
    }
};