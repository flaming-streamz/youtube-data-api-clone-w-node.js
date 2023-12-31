import mongoose from "mongoose";

import { Comment } from "@/schemas/comment-schema";
import type { DatabaseModelsType } from "@/models/index";
import type { ResourceObjectId } from "@/utils/object-id";

export default function makeCommentsDb({ database }: { database: DatabaseModelsType }) {
  const { comments: commentsModel } = database;
  return Object.freeze({ findAll, findByHash, findById, findByVideoId, findReplies, insert, remove, update });

  async function findAll({ publishedOnly = true }: { publishedOnly?: boolean }) {
    const query: mongoose.FilterQuery<Comment> = publishedOnly ? { isPublished: true } : {};
    const result = await commentsModel.find({ ...query });
    return result.map(({ _id: id, ...rest }) => ({
      id,
      ...rest,
    }));
  }

  async function findByHash() {}

  async function findById({ id }: { id: ResourceObjectId }) {
    const result = await commentsModel.findById(id);
    return result;
  }

  async function findByVideoId({ videoId, omitReplies = true }: { videoId: ResourceObjectId; omitReplies: boolean }) {
    const query: mongoose.FilterQuery<Comment> = { videoId };
    const result = await commentsModel.find({ ...query });

    // TODO: make this efficent
    if (!omitReplies) {
      const resultWithReplies = await Promise.all(
        result.map(async (item) => {
          const comments = await commentsModel.find({ parentId: item._id });
          return {
            ...item,
            replies: [...comments],
          };
        })
      );

      return resultWithReplies;
    }

    return result;
  }

  async function findReplies({
    commentId,
    publishedOnly = true,
  }: {
    commentId: ResourceObjectId;
    publishedOnly?: boolean;
  }) {
    const query = publishedOnly ? { published: true, replyToId: commentId } : { replyToId: commentId };
    const result = await commentsModel.find({ ...query });
    return result;
  }

  async function insert(comment: Comment) {
    const result = await commentsModel.create({ ...comment });
    return result;
  }

  async function update(id: string, commentUpdate: Partial<Comment>) {
    await commentsModel.updateOne({ _id: id }, { $set: { ...commentUpdate } });
  }

  async function remove({ id: _id }: { id: ResourceObjectId }) {
    const result = await commentsModel.deleteOne({ _id });
    return result.deletedCount;
  }
}
