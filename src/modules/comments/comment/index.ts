import crypto from "node:crypto";
import sanitizeHtml from "sanitize-html";
import { isIP } from "node:net";
import z, { AnyZodObject } from "zod";

import Id from "@/utils/object-id";

import buildMakeCommentSource from "./comment-source";
import buildMakeComment from "./build-make-comment";

const makeSource = buildMakeCommentSource({ isValidIp });
const makeComment = buildMakeComment({ ObjectId: Id, md5, sanitize, makeSource, validateInput });

function isValidIp(ip: string) {
  if (isIP(ip) === 0) return false;
  return true;
}

function md5(text: string) {
  return crypto.createHash("md5").update(text, "utf-8").digest("hex");
}

function sanitize(text: string) {
  return sanitizeHtml(text, {});
}

// validate comment input
function validateInput<T = any>(input: T): T {
  const schema = z.object({
    text: z.string({ required_error: "Provide comment text." }),
  });

  return schema.parse(input) as T;
}

export default makeComment;
