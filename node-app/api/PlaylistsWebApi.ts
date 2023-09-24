import express, { Application, Request, Response } from "express";
import { ErrorObject } from "./ErrorObject";
import { PlaylistsRepository } from "./implementations/PlaylistsRepository";
import { SimpleJSONFileModelStorage } from "./implementations/SimpleJSONFileModelStorage";
import path from "path";

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
        });

        // Read all
        app.get(`${PlaylistsWebApi.API_BASEPATH}/`, (request: Request, response: Response) => {
        });

        // Read one
        app.get(`${PlaylistsWebApi.API_BASEPATH}/:id`, (request: Request, response: Response) => {
        });

        // Update one
        app.patch(`${PlaylistsWebApi.API_BASEPATH}/:id`, (request: Request, response: Response) => {
        });

        // Delete one
        app.delete(`${PlaylistsWebApi.API_BASEPATH}/:id`, (request: Request, response: Response) => {
        });
    }
};