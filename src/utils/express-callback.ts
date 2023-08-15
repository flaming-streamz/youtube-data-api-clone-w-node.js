import express from "express";
import { StatusCodes } from "http-status-codes";

export interface HTTPRequest<ParamsDictionary = any, RequestBody = any, QueryDictionary = any> {
  body: RequestBody;
  query: QueryDictionary;
  params: ParamsDictionary;
  ip: string;
  method: string;
  path: string;
  headers: { [key: string]: string | undefined };
}

interface HTTPResponse {
  headers?: { [key: string]: string | undefined };
  body: any;
  statusCode: number;
}

type ControllerHandler = (httpRequest: HTTPRequest) => Promise<HTTPResponse>;

export default function makeExpressCallback(controllerCallback: ControllerHandler) {
  return (request: express.Request, response: express.Response) => {
    const httpRequest = {
      body: request.body,
      query: request.query,
      params: request.params,
      ip: request.ip,
      method: request.method,
      path: request.path,
      headers: {
        "Content-Type": request.get("Content-Type"),
        Referer: request.get("referer"),
        "User-Agent": request.get("User-Agent"),
      },
    };

    console.log("express-callback.ts ~ httpRequest:", httpRequest);

    controllerCallback(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          response.set(httpResponse.headers);
        }
        response.type("application/json");
        response.status(httpResponse.statusCode).send({ ...httpResponse.body });
      })
      .catch((error) => {
        console.log("express-callback.ts caught error ~", error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "An unknown server error ocurred." });
      });
  };
}
