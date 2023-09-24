import { AbstractModel } from "./AbstractModel";
import { Position } from "../models/Position";

export abstract class AbstractRenderConfig extends AbstractModel {
    name: string = 'A new render configuration';
    backgroundColor: string = '00000000'; // transparent
    position: Position = new Position();

    constructor() {
        super();
        this.modelType = 'RenderConfig';
        Object.setPrototypeOf(this, AbstractRenderConfig.prototype);
    }
};
