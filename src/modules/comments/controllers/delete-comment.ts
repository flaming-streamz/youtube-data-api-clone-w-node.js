export default function makeDeleteComment({
  removeComment,
  logger,
}: {
  removeComment: ({ id }: { id: string }) => Promise<{ deletedCount: number }>;
  logger: any;
}) {
  return async function deleteComment(httpRequest: any) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const deletedComment = await removeComment({ id: httpRequest.params.id });

      return {
        headers,
        statusCode: deletedComment.deletedCount === 0 ? 404 : 200,
        body: { deleteComment },
      };
    } catch (error: any) {
      logger.error("Delete comment controller error ~ ", error);
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
