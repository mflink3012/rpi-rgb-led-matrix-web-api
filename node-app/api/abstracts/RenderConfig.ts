import { Model } from "./Model";
import { Position } from "../models/Position";

export abstract class RenderConfig extends Model {
    name: string = 'A new render configuration';
    backgroundColor: string = '00000000'; // transparent
    position: Position = new Position();

    constructor() {
        super();
        this.modelType = 'RenderConfig';
        Object.setPrototypeOf(this, RenderConfig.prototype);
    }
};
