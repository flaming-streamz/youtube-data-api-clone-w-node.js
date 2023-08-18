import { StatusCodes } from "http-status-codes";

import type { HTTPRequest } from "@/utils/express-callback";
import type { VideoPartParams } from "../interfaces";
import type { Video } from "@/schemas/video-schema";
import type { ListVideosServiceHandler } from ".";

// ?part=id,snippet
interface VideoQueryParams {
  part: string;
  order: "date" | "relevance" | "viewCount";
  maxResults: string;
  page: string;
  id: string;
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
    const { part, order, maxResults, page, id } = request.query;

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

    // Querying for Specific videos
    let videoIds: string[] = [];
    if (id) {
      const ids: string[] = id.split(",").map((videoId) => videoId.trim());
      if (ids.length > 1) {
        videoIds = ids;
      } else {
        videoIds.push(id);
      }
    }

    // Pagination parameters ...
    const pageNumber = parseInt(page, 10) || 1;
    const limit = parseInt(maxResults, 10) || 10;

    // get videos
    type ReturnedVideoType = Partial<Video> & { _id: string; __v: string };
    const data = await listVideos({ sortBy: order || "date", limit, page: pageNumber, videoIds });
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
        ...data.pagination,
        pageInfo: {
          totalResults: videos.length,
          resultsPerPage: limit,
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

// ***********************************************************
