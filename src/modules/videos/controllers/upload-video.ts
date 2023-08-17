import { StatusCodes } from "http-status-codes";
import busboy from "busboy";

import type { HTTPRequest } from "@/utils/express-callback";

export default function makeUploadVideo() {
  return async function uploadVideo(request: HTTPRequest) {
    const bb = busboy({ headers: request.headers });

    bb.on("file", async (_name, file, info) => {
      console.log(info.mimeType);
    });

    return {
      body: {},
      statusCode: StatusCodes.CREATED,
    };
  };
}
