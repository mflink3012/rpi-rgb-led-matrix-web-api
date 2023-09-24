import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ErrorObject } from "./ErrorObject";
import { RenderConfig } from "./models/RenderConfig";
import { BearerAuthorization } from "./BearerAuthorization";
import { RenderConfigsRepository } from "./implementations/RenderConfigsRepository";
import { SimpleJSONFileModelStorage } from "./implementations/SimpleJSONFileModelStorage";
import path from "path";

export class RpiRgbLedMatrixWebApi extends Object {
    // FIXME: Get that path from config. And decouple it somehow.
    static readonly renderConfigsRepo: RenderConfigsRepository = new RenderConfigsRepository(new SimpleJSONFileModelStorage(path.join(__dirname, '..', '..', 'data', 'renderConfigs.json')));
    static readonly API_VERSION: string = 'v1';
    static readonly API_BASEPATH: string = `/api/${RpiRgbLedMatrixWebApi.API_VERSION}`;

    constructor(app: Application, tokens: Array<string>, renderConfigs: Object = {}) {
        super();
        Object.setPrototypeOf(this, RpiRgbLedMatrixWebApi.prototype);

        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use(BearerAuthorization(tokens));

        app.post(`${RpiRgbLedMatrixWebApi.API_BASEPATH}/renderconfigs/`, (request: Request, response: Response) => {
            let renderConfig: RenderConfig = request.body;


            let result: express.Response<any, Record<string, any>> = null;
            
            try {
                result = response.status(201).send(RpiRgbLedMatrixWebApi.renderConfigsRepo.create(renderConfig));
            } catch (error) {
                result = response.status(400).send(new ErrorObject('RENDER_CONFIG:CREATE_FAILED', error.toString()))
            }

            return result;
        });

        app.patch(`${RpiRgbLedMatrixWebApi.API_BASEPATH}/renderconfigs/:id`, (request: Request, response: Response) => {
            if (!RpiRgbLedMatrixWebApi.renderConfigsRepo.contains(request.params.id)) {
                let error: ErrorObject = new ErrorObject('RENDER_CONFIG:NOT_FOUND', 'There is no render-config with id (id)!', { id: request.params.id });
                return response.status(404).send(error);
            }

            let renderConfig: RenderConfig = request.body;
            renderConfig.id = request.params.id;
            return response.status(200).send(RpiRgbLedMatrixWebApi.renderConfigsRepo.update(renderConfig));
        });

        app.delete(`${RpiRgbLedMatrixWebApi.API_BASEPATH}/renderconfigs/:id`, (request: Request, response: Response) => {
            if (RpiRgbLedMatrixWebApi.renderConfigsRepo.contains(request.params.id)) {
                RpiRgbLedMatrixWebApi.renderConfigsRepo.delete(request.params.id);
            } else if (!request.params.hasOwnProperty('missingError')) {
                let error: ErrorObject = new ErrorObject('RENDER_CONFIG:NOT_FOUND', 'There is no render-config with id (id)!', { id: request.params.id });
                return response.status(404).send(error);
            }

            return response.status(200).send();
        });

        app.get(`${RpiRgbLedMatrixWebApi.API_BASEPATH}/renderconfigs`, (request: Request, response: Response) => {
            return response.status(200).send(RpiRgbLedMatrixWebApi.renderConfigsRepo.readAll());
        });

        app.get(`${RpiRgbLedMatrixWebApi.API_BASEPATH}/renderconfigs/:id`, (request: Request, response: Response) => {
            if (!RpiRgbLedMatrixWebApi.renderConfigsRepo.contains(request.params.id)) {
                let error: ErrorObject = new ErrorObject('RENDER_CONFIG:NOT_FOUND', 'There is no render-config with id (id)!', { id: request.params.id });
                return response.status(404).send(error);
            }

            return response.status(200).send(RpiRgbLedMatrixWebApi.renderConfigsRepo.read(request.params.id));
        });
    }
};