import commentService from "../use-cases";
import logger from "@/utils/logger";

import makeDeleteComment from "./delete-comment";

const deleteComment = makeDeleteComment({ removeComment: commentService.removeComment, logger: logger });

const commentsController = Object.freeze({
  deleteComment,
});

export { deleteComment };
export default commentsController;
