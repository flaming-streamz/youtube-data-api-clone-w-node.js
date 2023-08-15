import commentService from "../use-cases";

import makeDeleteComment from "./delete-comment";

const deleteComment = makeDeleteComment({ removeComment: commentService.removeComment });

const commentsController = Object.freeze({
  deleteComment,
});

export { deleteComment };
export default commentsController;
