import { ResourceObjectId } from "@/utils/object-id";

export interface Source {
  ip: string;
  browser?: string;
  referrer?: string;
}

export interface CommentInput {
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

export interface CommentInfo {
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
