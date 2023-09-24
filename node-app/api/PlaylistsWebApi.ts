import express, { Application, Request, Response } from "express";
import { ErrorObject } from "./ErrorObject";
import { PlaylistsRepository } from "./implementations/PlaylistsRepository";
import { SimpleJSONFileModelStorage } from "./implementations/SimpleJSONFileModelStorage";
import path from "path";

export class PlaylistsWebApi extends Object {
    // FIXME: Get that path from config. And decouple it somehow.
    static readonly REPO: PlaylistsRepository = new PlaylistsRepository(new SimpleJSONFileModelStorage(path.join(__dirname, '..', '..', 'data', 'playlists.json')));
    static readonly API_VERSION: string = 'v1';
    static readonly API_BASEPATH: string = `/api/${PlaylistsWebApi.API_VERSION}`;

    constructor(app: Application) {
        super();
        Object.setPrototypeOf(this, PlaylistsWebApi.prototype);

        // TODO: Register methods for handling CRUD on playlists
    }
};