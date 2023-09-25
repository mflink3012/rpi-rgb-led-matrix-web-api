import { Model } from "../abstracts/Model";
import { RenderConfig } from "../abstracts/RenderConfig";

export class Playlist extends Model {
    name: string = 'default';
    renderconfigs: Array<RenderConfig> = new Array<RenderConfig>();
    endless: boolean = true;
    shuffle: boolean = false;

    constructor() {
        super();
        this.modelType = 'Playlist';
        Object.setPrototypeOf(this, Playlist.prototype);
    }
};