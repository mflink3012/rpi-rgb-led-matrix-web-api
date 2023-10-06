import express, { Application, NextFunction, Request, Response } from "express";
import path from "path";
import serveStatic from "serve-static";
import { RpiRgbLedMatrixWebApi } from "./api/RpiRgbLedMatrixWebApi";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

const APP: Application = express();
const PORT: number = 8000;  // TODO: Get this from config in a later stage
const PATH_TO_MEDIA = path.join(__dirname, '..', 'webroot', 'media'); // TODO: Get this from config in a later stage
const PATH_TO_CONFIG = path.join(__dirname, '..', 'config'); // TODO: Get this from config in a later stage

APP.get('/media', serveStatic(PATH_TO_MEDIA));

const ACCESS_TOKENS_FILEPATH = path.join(PATH_TO_CONFIG, 'access-tokens.json'); // TODO: Get this from config in a later stage

// Initialize access-tokens, if not existant.
if (!fs.existsSync(ACCESS_TOKENS_FILEPATH)) {
    fs.mkdirSync(PATH_TO_CONFIG, {recursive: true});
    let token: string = uuidv4();
    let tokens: Array<String> = new Array<String>();
    tokens.push(token);
    let tokens_content: string = JSON.stringify(tokens);
    fs.writeFileSync(ACCESS_TOKENS_FILEPATH, tokens_content, 'utf-8');
    console.log('File %s didn\'t exist, so it has been created.', ACCESS_TOKENS_FILEPATH);
    console.log('Initialized a first access-token: %s', token);
}

const TOKENS_CONTENT :string = fs.readFileSync(ACCESS_TOKENS_FILEPATH, 'utf-8');
const TOKENS :Array<string> = JSON.parse(TOKENS_CONTENT);

console.log('%d access-token(s) read from file.', TOKENS.length);

new RpiRgbLedMatrixWebApi(APP, TOKENS);

APP.listen(PORT, (): void => {
    console.log('Webserver is running on port %d ...', PORT);
});