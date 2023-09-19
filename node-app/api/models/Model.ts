export abstract class Model extends Object {
    id: string;
    created: string;
    updated: string;
    version: number = 1;
    hash: string = null;
    className: string = 'Model';

    constructor() {
        super();
        Object.setPrototypeOf(this, Model.prototype);
    }
};