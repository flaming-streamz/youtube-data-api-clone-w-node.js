import makeComment from "../comment";
import { CommentsDbType } from "../data-access";
import {} from "../interfaces";

interface Comment {
  text: string;
  author: string;
}

export default function makeAddComment({ commentsRepo }: { commentsRepo: CommentsDbType }) {
  return async function addComment(commentInfo: Comment) {
    const comment = makeComment({
      author: commentInfo.author,
      text: commentInfo.text,
      source: { ip: "" },
    });

    // check if exists
    const exists = await commentsRepo.findByHash();
  };
}
