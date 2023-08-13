import Database from "@/models/index";
import makeCommentsDb from "./comments-db";

const commentsDb = makeCommentsDb({ database: Database });
export default commentsDb;

export type CommentsDbType = typeof commentsDb;

function containsLinks(commentText: string): boolean {
  const linkRegex = /(http|https):\/\/[^\s/$.?#].[^\s]*/gi;
  return linkRegex.test(commentText);
}
