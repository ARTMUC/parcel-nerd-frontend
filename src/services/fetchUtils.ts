import { ServerError } from '../interfaces/server-error.interface';
import { logoutUser } from './authService';

export const API_URL = 'http://localhost:3000/';

export const FRONT_URL = 'http://localhost:3001/';

export const defaultErrMessage = 'Something went wrong. Please try again later';

export class FetchError extends Error {
  constructor(message: string | undefined) {
    super(message);
  }
}

export const mapServerResponse = <T>(response: Response, body: T | ServerError): T | void => {
  switch (response.status) {
    case 200:
    case 201:
      return body as T;
    case 400:
    case 403:
    case 404:
    case 500:
      if ('message' in body) throw new FetchError(body.message);
      break;
    case 401:
      logoutUser();
      break;
    default:
      throw new FetchError(defaultErrMessage);
  }
};
