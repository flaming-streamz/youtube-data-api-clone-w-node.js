import { prop } from "@typegoose/typegoose";

export class Channel {
  displayName?: string;

  @prop({ type: String })
  handler?: string;

  descriptionText?: string;
}
