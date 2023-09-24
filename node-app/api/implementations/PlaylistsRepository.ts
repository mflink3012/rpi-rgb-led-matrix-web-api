import { ModelRepository } from "../abstracts/ModelRepository";
import { Playlist } from "../models/Playlist";
import { ModelStorageInterface } from "../interfaces/StorageInterface";

export class PlaylistsRepository extends ModelRepository<Playlist> {
    constructor(storage :ModelStorageInterface<Playlist>) {
        super(storage);
        Object.setPrototypeOf(this, PlaylistsRepository.prototype);
    }
};