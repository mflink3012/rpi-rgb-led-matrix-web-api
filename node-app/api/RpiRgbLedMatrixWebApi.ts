import express, { Application } from "express";
import cors from "cors";
import { BearerAuthorization } from "./BearerAuthorization";
import { RenderConfigsWebApi } from "./RenderConfigsWebApi";
import { PlaylistsWebApi } from "./PlaylistsWebApi";

export class RpiRgbLedMatrixWebApi extends Object {
    constructor(app: Application, tokens: Array<string>) {
        super();
        Object.setPrototypeOf(this, RpiRgbLedMatrixWebApi.prototype);

        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use(BearerAuthorization(tokens));

        new RenderConfigsWebApi(app);
        new PlaylistsWebApi(app);
    }
};