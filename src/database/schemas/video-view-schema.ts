import { Ref } from "@typegoose/typegoose";
import { Video } from "./video-schema";

export class VideoView {
  video?: Ref<Video>;

  progress?: number;
}
