import { ServerError } from '../errors/http';

export type HttpResponse<T = any> = {
  statusCode: number;
  data: T;
};

export const ok = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  data,
});

export const created = <T = any>(data?: T): HttpResponse<T> =>
  ({
    statusCode: 201,
    data,
  } as HttpResponse<T>);

export const noContent = (): HttpResponse =>
  ({
    statusCode: 204,
    data: null,
  } as HttpResponse);

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error,
});

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined),
});

export const notFound = (error: Error): HttpResponse<Error> => ({
  statusCode: 404,
  data: error,
});

export const appError = (error: Error): HttpResponse<Error> =>
  ({
    statusCode: 400,
    data: error,
  } as HttpResponse<Error>);
