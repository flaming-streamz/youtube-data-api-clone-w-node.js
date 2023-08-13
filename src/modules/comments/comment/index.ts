import crypto from "node:crypto";
import sanitizeHtml from "sanitize-html";
import ipRegex from "ip-regex";

import Id from "@/utils/object-id";

import buildMakeCommentSource from "./comment-source";
import buildMakeComment from "./build-make-comment";

const makeSource = buildMakeCommentSource({ isValidIp });
const makeComment = buildMakeComment({ Id: Id, md5, sanitize, makeSource });

function isValidIp(ip: string) {
  return ipRegex({ exact: true }).test(ip);
}

function md5(text: string) {
  return crypto.createHash("md5").update(text, "utf-8").digest("hex");
}

function sanitize(text: string) {
  return sanitizeHtml(text, {});
}

export default makeComment;
