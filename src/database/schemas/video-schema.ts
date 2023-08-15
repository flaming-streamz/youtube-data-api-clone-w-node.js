import { Ref, prop } from "@typegoose/typegoose";
import { Channel } from "./channel-schema";

export class Video {
  @prop({ ref: () => Channel })
  channelId?: Ref<Channel>;
}
