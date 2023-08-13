import type { Id, ResourceObjectId } from "@/utils/object-id";

interface CommentInput {
  author: string;
  createdAt: Date;
  id: ResourceObjectId;
  source: string;
  postId: string;
  published: boolean;
  replyToId: string;
  updatedAt: Date;
  text: string;
}

export default function buildMakeComment({
  Id,
  makeSource,
  md5,
  sanitize,
}: {
  Id: Id;
  md5: (text: string) => string;
  sanitize(text: string): string;
  makeSource: any;
}) {
  return function makeComment({
    author,
    createdAt,
    id = Id.makeId,
    postId,
    published,
    replyToId,
    source,
    text,
    updatedAt,
  }: CommentInput) {
    // validations here

    // sanitize comment text
    let sanitizedText = sanitize(text).trim();
    const deletedText = "xx This comment was deleted xx";
    let hash: string;

    return Object.freeze({
      getId: () => id,
      getText: () => sanitizedText,
      getHash: () => hash || (hash = makeHash()),
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
      return md5(sanitizedText + published + (author || "") + (postId || "") + (replyToId || ""));
    }
  };
}
