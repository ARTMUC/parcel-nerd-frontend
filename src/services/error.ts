import { ServerError } from "../interfaces/server-error.interface";

export const defaultErrMessage = "Something went wrong. Please try again later";

export class FetchError extends Error {
    constructor(message: string | undefined) {
        super(message);
    }
}

export const mapServerResponse = <T,>(
    response: Response,
    body: T | ServerError
): T | void => {
    switch (response.status) {
        case 200:
        case 201:
            return body as T;
        case 400:
        case 403:
        case 404:
        case 500:
            if ("message" in body) throw new FetchError(body.message);
            break;
        default:
            throw new FetchError(defaultErrMessage);
    }
}