import { Model } from "../abstracts/Model";

export class Playlist extends Model {
    name: string = 'default';
    renderconfigs: Array<string> = new Array<string>();
    endless: boolean = true;
    shuffle: boolean = false;

    constructor() {
        super();
        this.modelType = 'Playlist';
        Object.setPrototypeOf(this, Playlist.prototype);
    }
};