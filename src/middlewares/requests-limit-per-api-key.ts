import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const apiKeyTypes = {
  Free: { requests: 10_000 },
};

const requestsTrackingCounter: {
  [apiKey: string]: { count: number; timestamp: number };
} = {};

function getApiKeyType(apiKey: string) {}

function validateApiKey(apiKey: string) {}

export default function apiKeyRateLimiter(request: Request<{}, {}, {}, { key: string }>, response: Response) {
  const { key: apiKey } = request.query;
  const xApiKey = request.headers["x-api-key"];

  if (!request.query.key || request.headers["x-api-key"]) {
    return response.status(StatusCodes.FORBIDDEN).send({
      errorCode: "forbidden",
      errorDetails: "Missing API KEY!",
    });
  }
}
