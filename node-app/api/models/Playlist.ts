import { AbstractModel } from "../abstracts/AbstractModel";
import { AbstractRenderConfig } from "../abstracts/AbstractRenderConfig";

export class Playlist extends AbstractModel {
    name: string = 'default';
    renderconfigs: Array<AbstractRenderConfig> = new Array<AbstractRenderConfig>();
    endless: boolean = true;
    shuffle: boolean = false;

    constructor() {
        super();
        Object.setPrototypeOf(this, Playlist.prototype);
    }
};