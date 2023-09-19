import { NextFunction, Request, Response } from "express";
import { ErrorObject } from "./ErrorObject";

export function BearerAuthorization(tokens: string[]) {
    return (request: Request, response: Response, next: NextFunction) => {
        if (!request.headers.authorization) {
            let error: ErrorObject = new ErrorObject('AUTHORIZATION:MISSING_HEADER', 'No authorization-header provided!');
            return response.setHeader('WWW-Authenticate', 'Bearer').status(401).send(error);
        } else if (!request.headers.authorization.toLowerCase().startsWith('bearer ')) {
            let auth: Array<string> = request.headers.authorization.split(' ');
            let error: ErrorObject = new ErrorObject('AUTHORIZATION:INVALID_FORMAT', 'The format of the authorization-header provided is not valid!');

            if (auth.length > 1) {
                let method: string = auth[0];
                error = new ErrorObject('AUTHORIZATION:INVALID_METHOD', 'The method (method) in the authorization-header provided is not valid!', { method: method });
            }

            return response.setHeader('WWW-Authenticate', 'Bearer').status(401).send(error);
        }

        let auth: Array<string> = request.headers.authorization.split(' ');

        if (auth.length > 2) {
            let error: ErrorObject = new ErrorObject('AUTHORIZATION:INVALID_FORMAT', 'The format of the authorization-header provided is not valid!');
            return response.setHeader('WWW-Authenticate', 'Bearer').status(401).send(error);
        }

        let token = auth[1];

        if (!tokens.includes(token)) {
            let error: ErrorObject = new ErrorObject('AUTHORIZATION:INVALID_TOKEN', 'The provided token in the authorization-header is not valid!');
            return response.setHeader('WWW-Authenticate', 'Bearer').status(401).send(error);
        }

        next();
    };
};