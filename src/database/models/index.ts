import { getModelForClass } from "@typegoose/typegoose";

import { Comment } from "@/schemas/comment-schema";

const CommentModel = getModelForClass(Comment, {
  schemaOptions: {
    id: true,
    timestamps: true,
  },
});

const db = {
  comments: CommentModel,
};

export default db;
export type DatabaseModelsType = typeof db;
