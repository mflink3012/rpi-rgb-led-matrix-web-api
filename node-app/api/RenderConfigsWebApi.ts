import express, { Application, Request, Response } from "express";
import { ErrorObject } from "./ErrorObject";
import { RenderConfig } from "./abstracts/RenderConfig";
import { RenderConfigsRepository } from "./implementations/RenderConfigsRepository";
import { SimpleJSONFileModelStorage } from "./implementations/SimpleJSONFileModelStorage";
import path from "path";

export class RenderConfigsWebApi extends Object {
    // FIXME: Get that path from config. And decouple it somehow.
    static readonly REPO: RenderConfigsRepository = new RenderConfigsRepository(new SimpleJSONFileModelStorage(path.join(__dirname, '..', '..', 'data', 'renderConfigs.json')));
    static readonly API_VERSION: string = 'v1';
    static readonly API_BASEPATH: string = `/api/${RenderConfigsWebApi.API_VERSION}/renderconfigs`;

    constructor(app: Application) {
        super();
        Object.setPrototypeOf(this, RenderConfigsWebApi.prototype);

        // Create one
        app.post(`${RenderConfigsWebApi.API_BASEPATH}/`, (request: Request, response: Response) => {
            let renderConfig: RenderConfig = request.body;


            let result: express.Response<any, Record<string, any>> = null;

            try {
                result = response.status(201).send(RenderConfigsWebApi.REPO.create(renderConfig));
            } catch (error) {
                result = response.status(400).send(new ErrorObject('RENDER_CONFIG:CREATE_FAILED', error.toString()))
            }

            return result;
        });

        // Read all
        app.get(`${RenderConfigsWebApi.API_BASEPATH}/`, (request: Request, response: Response) => {
            return response.status(200).send(RenderConfigsWebApi.REPO.readAll());
        });

        // Read one
        app.get(`${RenderConfigsWebApi.API_BASEPATH}/:id`, (request: Request, response: Response) => {
            if (!RenderConfigsWebApi.REPO.contains(request.params.id)) {
                let error: ErrorObject = new ErrorObject('RENDER_CONFIG:NOT_FOUND', 'There is no render-config with id (id)!', { id: request.params.id });
                return response.status(404).send(error);
            }

            return response.status(200).send(RenderConfigsWebApi.REPO.read(request.params.id));
        });

        // Update one
        app.patch(`${RenderConfigsWebApi.API_BASEPATH}/:id`, (request: Request, response: Response) => {
            if (!RenderConfigsWebApi.REPO.contains(request.params.id)) {
                let error: ErrorObject = new ErrorObject('RENDER_CONFIG:NOT_FOUND', 'There is no render-config with id (id)!', { id: request.params.id });
                return response.status(404).send(error);
            }

            let renderConfig: RenderConfig = request.body;
            renderConfig.id = request.params.id;
            return response.status(200).send(RenderConfigsWebApi.REPO.update(renderConfig));
        });

        // Delete one
        app.delete(`${RenderConfigsWebApi.API_BASEPATH}/:id`, (request: Request, response: Response) => {
            if (RenderConfigsWebApi.REPO.contains(request.params.id)) {
                RenderConfigsWebApi.REPO.delete(request.params.id);
            } else if (!request.params.hasOwnProperty('missingError')) {
                let error: ErrorObject = new ErrorObject('RENDER_CONFIG:NOT_FOUND', 'There is no render-config with id (id)!', { id: request.params.id });
                return response.status(404).send(error);
            }

            return response.status(200).send();
        });
    }
};