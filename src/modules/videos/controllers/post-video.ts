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

type VideoPartParams =
  | "id"
  | "snippet"
  | "statistics"
  | "liveStreamingDetails"
  | "contentDetails"
  | "fileDetails"
  | "status";

// ?part=id,snippet
interface VideoQueryParams {
  part: string;
  notifySubscribers: boolean;
}

const allowedPartParams: VideoPartParams[] = [
  "id",
  "snippet",
  "status",
  "statistics",
  "liveStreamingDetails",
  "fileDetails",
  "contentDetails",
];

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
    // const bb = busboy({ headers: request.headers, preservePath: true });

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
    result["etag"] = insertedVideo.etag;

    if (partArray.includes("id")) {
      result["id"] = insertedVideo._id;
    }

    // Video Snippet details
    if (partArray.includes("snippet")) {
      // console.log(insertedVideo.channelDetails);
      result["snippet"] = {
        title: insertedVideo.title,
        description: insertedVideo.description,
        publishedAt: insertedVideo.createdAt,
        modifiedOn: insertedVideo.updatedAt,
        thumbnails: insertedVideo.thumbnails,
        hasCustomThumbnail: insertedVideo.hasCustomThumbnail,
        channelId: insertedVideo.channelDetails.channelId,
        channelTitle: insertedVideo.channelDetails.channelTitle,
        categoryId: insertedVideo.categoryId || "xx-unidentified-xx",
      };
    }

    // Video Status details
    if (partArray.includes("status") && insertedVideo.status) {
      const { ...rest } = insertedVideo.status;
      result["status"] = {
        ...rest,
      };
    }

    // Video Content details
    if (partArray.includes("contentDetails") && insertedVideo.contentDetails) {
      result["contentDetails"] = { ...insertedVideo.contentDetails };
    }

    // Video Statistics details
    if (partArray.includes("statistics") && insertedVideo.statistics) {
      result["statistics"] = { ...insertedVideo.statistics };
    }

    // Video Live streaming details
    if (partArray.includes("liveStreamingDetails") && insertedVideo.liveStreamingDetails) {
      result["liveStreamingDetails"] = { ...insertedVideo.liveStreamingDetails };
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
