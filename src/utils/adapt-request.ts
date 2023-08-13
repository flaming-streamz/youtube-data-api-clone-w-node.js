import { Request } from "express";

export default function adaptRequest(request: Request) {
  return Object.freeze({
    path: request.path,
    method: request.method,
    pathParams: request.params,
    queryParams: request.query,
    body: request.body,
    ip: request.ip,
  });
}
