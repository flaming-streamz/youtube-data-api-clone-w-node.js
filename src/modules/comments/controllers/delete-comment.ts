import { HTTPRequest } from "@/utils/express-callback";
import type { Logger } from "@/utils/logger";

export default function makeDeleteComment({
  removeComment,
  logger,
}: {
  removeComment: ({ id }: { id: string }) => Promise<{ deletedCount: number }>;
  logger: Logger;
}) {
  return async function deleteComment(httpRequest: HTTPRequest<{ id: string }>) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const deletedComment = await removeComment({ id: httpRequest.params.id });

      return {
        headers,
        statusCode: deletedComment.deletedCount === 0 ? 404 : 200,
        body: { deletedComment },
      };
    } catch (error: any) {
      logger.error(error, "Delete comment controller error");
      return {
        headers,
        statusCode: 400,
        body: {
          error: error.message,
        },
      };
    }
  };
}
