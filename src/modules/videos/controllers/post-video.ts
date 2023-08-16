import { StatusCodes } from "http-status-codes";
// import busboy from "busboy";

import type { HTTPRequest } from "@/utils/express-callback";
import type { InsertVideoServiceHandler } from ".";
import type { Status } from "../interfaces";

interface VideoReqBody {
  snippet: { title: string; description: string };
  recordingDetails: { recordingDetails: string };
  status?: Status;
}

type VideoPartParams = "id" | "snippet" | "liveStreamingDetails" | "contentDetails" | "fileDetails";

// ?part=id,snippet
interface VideoQueryParams {
  part: string;
  notifySubscribers: boolean;
}

const allowedPartParams: VideoPartParams[] = ["id", "snippet", "liveStreamingDetails", "fileDetails", "contentDetails"];

export default function makePostVideo({ insertVideo }: { insertVideo: InsertVideoServiceHandler }) {
  return async function postVideo(request: HTTPRequest<object, VideoReqBody, VideoQueryParams>) {
    const { part, notifySubscribers } = request.query;
    if (!part || part.length < 1) throw new Error("Provide the video part query parameter.");
    const partArray: VideoPartParams[] = part.split(",").map((str) => str.trim() as VideoPartParams);

    // check provided part array for invalid entries
    partArray.forEach((partStr) => {
      const isAllowed = allowedPartParams.includes(partStr);
      if (!isAllowed)
        throw new Error(
          `Parameter '${partStr}' is not accepted for part query parameter. Accepted values are ${allowedPartParams}`
        );
    });

    if (notifySubscribers && notifySubscribers === true) {
      // TODO: Implement notifying subscribers
    }

    // Upload video
    // TODO: Expect to only receive video url, later after video is uploaded to our custom server
    // const bb = busboy({ headers: request.headers });

    // bb.on("file", (name, file, info) => {
    //   const { filename } = info;
    //   console.log(filename);
    // });

    // bb.on("field", (name, val, info) => {
    //   console.log(`Field [${name}]: value: %j`, val);
    // });

    // Deal with video meta data
    const {
      snippet: { title, description },
      //   recordingDetails: { recordingDetails }
    } = request.body;

    const insertedVideo = await insertVideo({
      title,
      description,
    });

    // Genrate response body
    const result: Partial<{ [key in VideoPartParams | "etag"]: unknown }> = {};
    result["etag"] = insertedVideo._id.toHexString() + insertedVideo._id.toHexString();

    if (partArray.includes("id")) {
      result["id"] = insertedVideo._id;
    }

    // Video Snippet details
    if (partArray.includes("snippet")) {
      result["snippet"] = {
        title: insertedVideo.title,
        description: insertedVideo.description,
      };
    }

    // Video Live streaming details
    if (partArray.includes("liveStreamingDetails")) {
      result["liveStreamingDetails"] = {};
    }

    return {
      body: {
        kind: "youtubeclone#video",
        ...result,
      },
      statusCode: StatusCodes.CREATED,
    };
  };
}
