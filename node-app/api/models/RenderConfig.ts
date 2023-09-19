import { Dimensions } from "./Dimensions";
import { Model } from "./Model";
import { Position } from "./Position";

export class RenderConfig extends Model {
    name: string = 'A new render configuration';
    backgroundColor: string = '00000000'; // transparent
    position: Position = new Position();

    constructor() {
        super();
        this.modelType = 'RenderConfig';
        Object.setPrototypeOf(this, RenderConfig.prototype);
    }
};

export class ImageRenderConfig extends RenderConfig {
    dimensions: Dimensions = new Dimensions();
    image: string = 'media/images/test_64x64.bmp';

    constructor() {
        super();
        this.modelType = 'ImageRenderConfig';
        Object.setPrototypeOf(this, ImageRenderConfig.prototype);
    }
};

export class StaticImageRenderConfig extends ImageRenderConfig {
    time: number = 3; // seconds

    constructor() {
        super();
        this.modelType = 'StaticImageRenderConfig';
        Object.setPrototypeOf(this, StaticImageRenderConfig.prototype);
    }
};

export class AnimatedImageRenderConfig extends ImageRenderConfig {
    loops: number = 1;

    constructor() {
        super();
        this.modelType = 'AnimatedImageRenderConfig';
        Object.setPrototypeOf(this, AnimatedImageRenderConfig.prototype);
    }
};

export class TextRenderConfig extends RenderConfig {
    font: string = '4x6';
    text: string = 'n/a';
    color: string = 'ffffffff'; // white
    spacing: number = 1;

    constructor() {
        super();
        this.modelType = 'StaticTextRenderConfig';
        Object.setPrototypeOf(this, TextRenderConfig.prototype);
    }
};

export class StaticTextRenderConfig extends TextRenderConfig {
    time: number = 3; // seconds

    constructor() {
        super();
        this.modelType = 'StaticTextRenderConfig';
        Object.setPrototypeOf(this, StaticTextRenderConfig.prototype);
    }
};

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