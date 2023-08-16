import { HTTPRequest } from "@/utils/express-callback";
import { RemoveVideoServiceHandler } from ".";
import { StatusCodes } from "http-status-codes";

export default function makeDeleteVideo({ removeVideo }: { removeVideo: RemoveVideoServiceHandler }) {
  return async function deleteVideo(request: HTTPRequest<object, object, { id: string }>) {
    if (!request.query.id) throw new Error("Provide video Id. This is a query parameter.");

    const deletedVideo = await removeVideo({ id: request.query.id });

    return {
      body: {
        deleteVideo,
      },
      statusCode: deletedVideo.deletedCount === 0 ? 404 : StatusCodes.NO_CONTENT,
    };
  };
}
