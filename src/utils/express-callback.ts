/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { IncomingHttpHeaders } from "http";

export interface HTTPRequest<ParamsDictionary = any, RequestBody = any, QueryDictionary = any> {
  body: RequestBody;
  query: QueryDictionary;
  params: ParamsDictionary;
  ip: string;
  method: string;
  path: string;
  headers: IncomingHttpHeaders;
}

interface HTTPResponse {
  headers?: { [key: string]: string | undefined };
  body: any;
  statusCode: number;
}

type ControllerHandler = (httpRequest: HTTPRequest, next?: express.NextFunction) => Promise<HTTPResponse>;

export default function makeExpressCallback(controllerCallback: ControllerHandler) {
  return (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const httpRequest = {
      body: request.body,
      query: request.query,
      params: request.params,
      ip: request.ip,
      method: request.method,
      path: request.path,
      headers: {
        ...request.headers,
        "Content-Type": request.get("Content-Type"),
        Referer: request.get("referer"),
        "User-Agent": request.get("User-Agent"),
      },
    };

    controllerCallback(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          response.set(httpResponse.headers);
        }
        response.type("application/json");
        response.status(httpResponse.statusCode).send({ ...httpResponse.body });
      })
      .catch((error) => {
        return next(error);
      });
  };
}
