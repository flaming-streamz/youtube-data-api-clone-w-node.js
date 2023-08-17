import { getModelForClass } from "@typegoose/typegoose";

import { Comment } from "@/schemas/comment-schema";
import { Video } from "@/schemas/video-schema";

const VideosModel = getModelForClass(Video, { schemaOptions: { id: true, timestamps: true } });

const CommentModel = getModelForClass(Comment, {
  schemaOptions: {
    id: true,
    timestamps: true,
  },
});

const db = {
  comments: CommentModel,
  videos: VideosModel,
};

export default db;
export type DatabaseModelsType = typeof db;
