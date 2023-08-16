import type { HTTPRequest } from "@/utils/express-callback";
import { StatusCodes } from "http-status-codes";

export default function makeDeleteComment({
  removeComment,
}: {
  removeComment: ({ id }: { id: string }) => Promise<{ deletedCount: number }>;
}) {
  return async function deleteComment(httpRequest: HTTPRequest<object, object, { id: string }>) {
    const headers = {
      "Content-Type": "application/json",
    };

    const deletedComment = await removeComment({ id: httpRequest.query.id });

    return {
      headers,
      statusCode: deletedComment.deletedCount === 0 ? 404 : StatusCodes.NO_CONTENT,
      body: { deletedComment },
    };
  };
}
