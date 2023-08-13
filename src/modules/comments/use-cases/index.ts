/* file exports comment service frozen object
 */

import commentsRepo from "../data-access";
import makeRemoveComment from "./remove-comment";

// built comment service use-case
const removeComment = makeRemoveComment({ commentsRepo });

const commentService = Object.freeze({
  removeComment,
});

export default commentService;
