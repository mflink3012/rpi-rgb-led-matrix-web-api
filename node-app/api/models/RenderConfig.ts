import { AbstractImageRenderConfig } from "../abstracts/AbstractImageRenderConfig";
import { AbstractTextRenderConfig } from "../abstracts/AbstractTextRenderConfig";

export class StaticImageRenderConfig extends AbstractImageRenderConfig {
    time: number = 3; // seconds

    constructor() {
        super();
        this.modelType = 'StaticImageRenderConfig';
        Object.setPrototypeOf(this, StaticImageRenderConfig.prototype);
    }
};

export class AnimatedImageRenderConfig extends AbstractImageRenderConfig {
    loops: number = 1;

    constructor() {
        super();
        this.modelType = 'AnimatedImageRenderConfig';
        Object.setPrototypeOf(this, AnimatedImageRenderConfig.prototype);
    }
};

export class StaticTextRenderConfig extends AbstractTextRenderConfig {
    time: number = 3; // seconds

    constructor() {
        super();
        this.modelType = 'StaticTextRenderConfig';
        Object.setPrototypeOf(this, StaticTextRenderConfig.prototype);
    }
};

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

export const RenderConfigRegistry: Object = {
    StaticImageRenderConfig,
    AnimatedImageRenderConfig,
    StaticTextRenderConfig,
    AnimatedTextRenderConfig
}