import { StatusCodes } from "http-status-codes";

import type { HTTPRequest } from "@/utils/express-callback";
import type { InsertVideoServiceHandler } from ".";
import type { Status } from "../interfaces";

interface VideoReqBody {
  snippet: { title: string; description: string };
  recordingDetails?: { recordingDetails: string };
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
    if (!part || part.length < 1) throw new Error("Provide video part.");
    const partArray: VideoPartParams[] = part.split(",").map((str) => str.trim() as VideoPartParams);

    // check provided part array for invalid entries
    partArray.forEach((partStr) => {
      const isAllowed = allowedPartParams.includes(partStr);
      if (!isAllowed)
        throw new Error(
          `Parameter '${partStr}' is not accepted for part query parameter. Accepted values are ${allowedPartParams}`
        );
    });

    if (notifySubscribers) {
      console.log("Subscribers will be notified.");
    }

    const {
      snippet: { title, description },
    } = request.body;

    const insertedVideo = await insertVideo({
      title,
      description,
    });

    console.log(insertedVideo);

    const result: Partial<{ [key in VideoPartParams | "etag"]: unknown }> = {};
    if (partArray.includes("id")) {
      result["id"] = insertedVideo._id;
    }

    // Video Snippet details
    if (partArray.includes("snippet")) {
      result["snippet"] = {
        title: insertedVideo.title,
        description: insertedVideo.description,
      } as { title: string };
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
