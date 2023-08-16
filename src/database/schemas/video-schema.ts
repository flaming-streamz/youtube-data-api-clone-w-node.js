import { Ref, prop } from "@typegoose/typegoose";
import { Channel } from "./channel-schema";

export class Video {
  @prop({ ref: () => Channel })
  channelId?: Ref<Channel>;

  @prop({ type: String, required: true, index: "text" })
  title!: string;

  @prop({ type: String, required: true, index: "text" })
  description!: string;
}
