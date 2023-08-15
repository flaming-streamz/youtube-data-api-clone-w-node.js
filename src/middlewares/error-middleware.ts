import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

class HTTPException extends Error {
  public status: number;
  public override message: string;

  constructor(message: string, statusCode?: number) {
    super(message);

    this.status = statusCode || 500;
    this.message = message;
  }
}

export default function errorMiddleware(
  error: HTTPException & {
    code?: number;
    keyPattern?: { [key: string]: number };
    keyValue?: { [key: string]: unknown };
    kind?: string;
  },
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  let status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = error.message || "An unknown server error ocurred.";

  // console.log(JSON.stringify(error, null, 4));

  // Unauthenticated user
  if (error.status === StatusCodes.UNAUTHORIZED) {
    console.log("Error Handler ~ Unauthenticated Access Denied");
  }

  // Unauthorized user
  if (error.status === StatusCodes.FORBIDDEN) {
    console.log("Error Handler ~ Unauthorized Forbiden Access");
  }

  // document uniqueness and duplicates error
  if (error.code === 11000 && error.keyValue !== undefined) {
    const key = Object.keys(error.keyValue)[0];
    message = `${key.charAt(0).toUpperCase() + key.slice(1)}: '${error.keyValue[key]}' is already taken`;
    status = 400;
  }

  if (error.name === "CastError" && error.kind === "ObjectId") {
    status = 400;
    message = `Provided Id is an invalid ObjectId.`;
  }

  if (error)
    res.status(status).send({
      status,
      message,
    });
}
