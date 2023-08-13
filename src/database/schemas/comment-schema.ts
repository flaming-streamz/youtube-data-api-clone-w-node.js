import { prop, Ref } from "@typegoose/typegoose";

import { Video } from "./video-schema";

class CommentAuthor {}

export class Comment {
  @prop({ type: () => String })
  textOriginal!: string;

  @prop({ type: Boolean, default: false })
  isPublished?: boolean;

  @prop({ ref: () => Video })
  videoId?: Ref<Video>;
}
