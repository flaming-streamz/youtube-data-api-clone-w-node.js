import type { HTTPRequest } from "@/utils/express-callback";

export default function makeDeleteComment({
  removeComment,
}: {
  removeComment: ({ id }: { id: string }) => Promise<{ deletedCount: number }>;
}) {
  return async function deleteComment(httpRequest: HTTPRequest<{ id: string }>) {
    const headers = {
      "Content-Type": "application/json",
    };

    const deletedComment = await removeComment({ id: httpRequest.params.id });

    return {
      headers,
      statusCode: deletedComment.deletedCount === 0 ? 404 : 200,
      body: { deletedComment },
    };
  };
}
