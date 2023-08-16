import { HTTPRequest } from "@/utils/express-callback";
import { RemoveVideoServiceHandler } from ".";
import { StatusCodes } from "http-status-codes";

export default function makeDeleteVideo({ removeVideo }: { removeVideo: RemoveVideoServiceHandler }) {
  return async function deleteVideo(request: HTTPRequest<{ id: string }>) {
    if (!request.params.id) throw new Error("Provide video Id.");

    const deletedVideo = await removeVideo({ id: request.params.id });

    return {
      body: {
        deleteVideo,
      },
      statusCode: deletedVideo.deletedCount === 0 ? 404 : StatusCodes.NO_CONTENT,
    };
  };
}
