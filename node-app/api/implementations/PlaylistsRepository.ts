import { ModelRepository } from "../abstracts/ModelRepository";
import { Playlist } from "../models/Playlist";
import { ModelStorageInterface } from "../interfaces/StorageInterface";
import { PlaylistRegistry } from "../models/PlaylistRegistry";

export class PlaylistsRepository extends ModelRepository<Playlist> {
    constructor(storage :ModelStorageInterface<Playlist>) {
        super(PlaylistRegistry, storage);
        Object.setPrototypeOf(this, PlaylistsRepository.prototype);
    }
};