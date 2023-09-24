import * as fs from "fs";
import { ModelStorageInterface } from "../interfaces/StorageInterface";
import { Model } from "../abstracts/Model";
import path from "path";

export class SimpleJSONFileModelStorage<M extends Model> implements ModelStorageInterface<M> {
    private file: string = null;

    constructor(file: string, createIfNonExistant: boolean = true, defaultContent: Object = {}) {
        Object.setPrototypeOf(this, SimpleJSONFileModelStorage.prototype);

        this.file = file;

        if (createIfNonExistant && !fs.existsSync(this.file)) {
            fs.mkdirSync(path.dirname(this.file), {recursive: true});
            this.save(defaultContent);
        }
    }

    save(models: Object): boolean {
        fs.writeFileSync(this.file, JSON.stringify(models, null, 2), 'utf-8');
        return true;
    }

    load(): Object {
        return JSON.parse(fs.readFileSync(this.file, 'utf-8'));
    }
}