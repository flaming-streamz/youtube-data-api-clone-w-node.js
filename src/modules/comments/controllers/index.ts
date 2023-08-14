import commentService from "../use-cases";

import makeDeleteComment from "./delete-comment";

const deleteComment = makeDeleteComment({ removeComment: commentService.removeComment, logger: () => {} });

const commentsController = Object.freeze({
  deleteComment,
});

export default commentsController;
export { deleteComment };
