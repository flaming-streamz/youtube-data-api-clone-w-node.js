import type { ObjectIdType, ResourceObjectId } from "@/utils/object-id";
import { MakeSourceHandler } from "./comment-source";
import { Source } from "../interfaces";

interface CommentInput {
  author: string;
  createdAt?: Date;
  id?: ResourceObjectId;
  source: Source;
  videoId?: string;
  published?: boolean;
  replyToId?: string;
  updatedAt?: Date;
  text: string;
}

export default function buildMakeComment({
  ObjectId,
  makeSource,
  md5,
  sanitize,
  validateInput,
}: {
  ObjectId: ObjectIdType;
  md5: (text: string) => string;
  sanitize(text: string): string;
  makeSource: MakeSourceHandler;
  validateInput: <T = any>(commentInput: T) => T;
}) {
  return function makeComment({
    author,
    id = ObjectId.getId(),
    videoId,
    published,
    replyToId,
    source,
    text,
  }: CommentInput) {
    // validations here
    if (!ObjectId.isValid(id)) throw new Error("Comment must be a valid ObjectId.");

    const validSource = makeSource(source);

    const {} = validateInput({ text: text });

    // sanitize comment text
    let sanitizedText = sanitize(text).trim();
    const deletedText = "xx This comment was deleted xx";
    let hash: string;

    return Object.freeze({
      getId: () => id,
      getText: () => sanitizedText,
      getHash: () => hash || (hash = makeHash()),
      getSource: () => validSource,
      isPublished: () => published,
      isDeleted: () => sanitizedText === deletedText,
      markDeleted: () => {
        sanitizedText = deletedText;
        author = "deleted";
      },
      publish: () => {
        published = true;
      },
    });

    function makeHash() {
      return md5(sanitizedText + published + (author || "") + (videoId || "") + (replyToId || ""));
    }
  };
}
