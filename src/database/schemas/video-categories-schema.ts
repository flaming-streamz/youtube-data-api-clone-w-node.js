import { prop } from "@typegoose/typegoose";

export class VideoCategory {
  @prop({ type: String })
  name!: string;
}
