import { Model } from "./Model";
import { RenderConfig } from "./RenderConfig";

export class Playlist extends Model {
    name: string = 'default';
    renderconfigs: Array<RenderConfig> = new Array<RenderConfig>();
    endless: boolean = true;
    shuffle: boolean = false;

    constructor() {
        super();
        Object.setPrototypeOf(this, Playlist.prototype);
    }
};