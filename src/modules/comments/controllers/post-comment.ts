import type { HTTPRequest } from "@/utils/express-callback";

interface Comment {
  text: string;
}

export default function makePostComment({
  addComment,
}: {
  addComment: (comment: Comment) => Promise<{ deletedCount: number }>;
}) {
  return async function postComment(request: HTTPRequest<{}, { text: string }>) {
    const comment = await addComment({ text: request.body.text });

    return {
      statusCode: 201,
      body: { comment },
    };
  };
}
