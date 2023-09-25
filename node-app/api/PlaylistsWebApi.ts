import express, { Application, Request, Response } from "express";
import { ErrorObject } from "./ErrorObject";
import { PlaylistsRepository } from "./implementations/PlaylistsRepository";
import { SimpleJSONFileModelStorage } from "./implementations/SimpleJSONFileModelStorage";
import path from "path";
import { Playlist } from "./models/Playlist";

export class PlaylistsWebApi extends Object {
    // FIXME: Get that path from config. And decouple it somehow.
    static readonly REPO: PlaylistsRepository = new PlaylistsRepository(new SimpleJSONFileModelStorage(path.join(__dirname, '..', '..', 'data', 'playlists.json')));
    static readonly API_VERSION: string = 'v1';
    static readonly API_BASEPATH: string = `/api/${PlaylistsWebApi.API_VERSION}/playlists`;

    constructor(app: Application) {
        super();
        Object.setPrototypeOf(this, PlaylistsWebApi.prototype);

        // TODO: Register methods for handling CRUD on playlists

        // Create
        app.post(`${PlaylistsWebApi.API_BASEPATH}/`, (request: Request, response: Response) => {
            let playlist: Playlist = request.body;

            let result: express.Response<any, Record<string, any>> = null;

            try {
                result = response.status(201).send(PlaylistsWebApi.REPO.create(playlist));
            } catch (error) {
                result = response.status(400).send(new ErrorObject('PLAYLIST:CREATE_FAILED', error.toString()))
            }

            return result;
        });

        // Read all
        app.get(`${PlaylistsWebApi.API_BASEPATH}/`, (request: Request, response: Response) => {
            return response.status(200).send(PlaylistsWebApi.REPO.readAll());
        });

        // Read one
        app.get(`${PlaylistsWebApi.API_BASEPATH}/:id`, (request: Request, response: Response) => {
            if (!PlaylistsWebApi.REPO.contains(request.params.id)) {
                let error: ErrorObject = new ErrorObject('PLAYLIST:NOT_FOUND', 'There is no playlist with id (id)!', { id: request.params.id });
                return response.status(404).send(error);
            }

            return response.status(200).send(PlaylistsWebApi.REPO.read(request.params.id));
        });

        // Update one
        app.patch(`${PlaylistsWebApi.API_BASEPATH}/:id`, (request: Request, response: Response) => {
            if (!PlaylistsWebApi.REPO.contains(request.params.id)) {
                let error: ErrorObject = new ErrorObject('PLAYLIST:NOT_FOUND', 'There is no playlist with id (id)!', { id: request.params.id });
                return response.status(404).send(error);
            }

            let playlist: Playlist = request.body;
            playlist.id = request.params.id;
            return response.status(200).send(PlaylistsWebApi.REPO.update(playlist));
        });

        // Delete one
        app.delete(`${PlaylistsWebApi.API_BASEPATH}/:id`, (request: Request, response: Response) => {
            if (PlaylistsWebApi.REPO.contains(request.params.id)) {
                PlaylistsWebApi.REPO.delete(request.params.id);
            } else if (!request.params.hasOwnProperty('missingError')) {
                let error: ErrorObject = new ErrorObject('PLAYLIST:NOT_FOUND', 'There is no playlist with id (id)!', { id: request.params.id });
                return response.status(404).send(error);
            }

            return response.status(200).send();
        });
    }
};