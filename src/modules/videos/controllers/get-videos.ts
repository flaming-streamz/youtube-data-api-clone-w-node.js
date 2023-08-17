import { HTTPRequest } from "@/utils/express-callback";
import { StatusCodes } from "http-status-codes";
import { VideoPartParams } from "../interfaces";
import { ListVideosServiceHandler } from ".";
import { Video } from "@/schemas/video-schema";

// ?part=id,snippet
interface VideoQueryParams {
  part: string;
  order: "date" | "relevance" | "viewCount";
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

export default function makeGetVideos({ listVideos }: { listVideos: ListVideosServiceHandler }) {
  return async function getVideos(request: HTTPRequest<object, object, VideoQueryParams>) {
    const { part, order } = request.query;

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

    // get videos
    type ReturnedVideoType = Partial<Video> & { _id: string; __v: string };
    const data = await listVideos({ sortBy: order || "date" });
    const videos = data.results as unknown as ReturnedVideoType[];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const cleanedVideos = videos.map(({ __v, _id, ...rest }) => ({ id: _id, ...rest }));
    const results = buildResponseVideosList(cleanedVideos, partArray);

    // Genrate response body
    const result: Partial<{ [key in "items" | "etag" | "nextPageTokens" | "prevPageToken"]: unknown }> = {};
    result["etag"] = "xxx-videosListEtag-xxx";

    return {
      statusCode: StatusCodes.OK,
      body: {
        kind: "youtubeclone#videos-list-response",
        etag: result.etag,
        nextPageToken: "VVVXXX",
        prevPageToken: "QQQAAA",
        pageInfo: {
          totalResults: data.totalResults,
          resultsPerPage: "___",
        },
        items: [...results],
      },
    };
  };

  type VideoResourceType = "id" | "kind" | "etag" | "snippet";
  function buildResponseVideosList(videos: (Partial<Video> & { id: string })[], partArray: VideoPartParams[]) {
    return videos.map((video) => {
      const videoResult: Partial<{ [key in VideoResourceType]: unknown }> = {};

      videoResult["kind"] = "youtubeclone#video";
      videoResult["etag"] = video.etag;

      if (partArray.includes("id")) {
        videoResult["id"] = video.id;
      }

      if (partArray.includes("snippet")) {
        videoResult["snippet"] = {
          title: video.title,
          description: video.description,
          publishedAt: video.createdAt,
          channelId: video?.channelDetails?.channelId,
          channelTitle: video?.channelDetails?.channelTitle,
          thumbnails: video.thumbnails,
          categoryId: video.categoryId,
          tags: video.tags,
          hasCustomThumbnail: video.hasCustomThumbnail,
        };
      }

      return videoResult;
    });
  }
}
