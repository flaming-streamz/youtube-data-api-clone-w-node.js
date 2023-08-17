import { Ref, modelOptions, prop } from "@typegoose/typegoose";
import { Channel } from "./channel-schema";
import { VideoCategory } from "./video-categories-schema";

enum UploadStatus {
  Deleted = "deleted",
  Failed = "failed",
  Processed = "processed",
  Rejected = "rejected",
  Uploaded = "uploaded",
}
enum PrivacyStatus {
  Private = "private",
  Public = "public",
  Unlisted = "unlisted",
}
@modelOptions({ schemaOptions: { _id: false } })
class VideoStatus {
  @prop({ type: String, enum: UploadStatus, default: UploadStatus.Uploaded })
  uploadStatus?: UploadStatus;

  @prop({ type: String, enum: PrivacyStatus, default: PrivacyStatus.Private })
  privacyStatus?: PrivacyStatus;
}

enum ThumbnailKey {
  Default = "default",
  Medium = "medium",
  High = "high",
  Standard = "standard",
  Maxres = "maxres",
}
class Thumbnail {
  height!: number;
  url!: string;
  width!: number;
}

class ActiveLiveChat {
  @prop({ type: [String], default: [] })
  messages?: string[];
}

@modelOptions({ schemaOptions: { _id: false } })
class LiveStreamingDetails {
  @prop({ type: Date })
  actualStartTime?: Date;

  @prop({ type: Date })
  actualEndTime?: Date;

  @prop({ type: Date })
  scheduledStartTime?: Date;

  @prop({ type: Date })
  scheduledEndTime?: Date;

  @prop({ type: Number, default: 0 })
  concurrentViewers?: number;

  @prop({ ref: () => ActiveLiveChat })
  activeLiveChatId?: Ref<ActiveLiveChat>;
}

@modelOptions({ schemaOptions: { _id: false } })
class VideoStatistics {
  @prop({ type: Number, default: 0 })
  viewCount?: number;

  @prop({ type: Number, default: 0 })
  likesCount?: number;

  @prop({ type: Number, default: 0 })
  dislikesCount?: number;

  @prop({ type: Number, default: 0 })
  commentsCount?: number;
}

class ContentDetails {
  duration?: number;
  dimension?: string;
  definition?: "hd" | "sd";
  caption?: boolean;
  licensedContent?: boolean;
  regionRestriction?: {
    allowed: string[] | null;
    blocked: string[] | null;
  };
  contentRating?: [];
}

@modelOptions({ schemaOptions: { id: true, timestamps: true, virtuals: true, toJSON: { virtuals: true } } })
export class Video {
  @prop({ type: String, required: true })
  etag!: string;

  @prop({ type: String, index: "text" })
  title!: string;

  @prop({ type: String })
  description!: string;

  @prop({ type: Boolean, default: false })
  isPrivate?: boolean;

  @prop({ default: Date.now })
  createdAt?: Date;

  @prop({ default: Date.now })
  updatedAt?: Date;

  @prop({ type: [String], default: [] })
  tags?: string[];

  @prop({ type: Boolean, default: false })
  hasCustomThumbnail?: boolean;

  @prop({ type: () => Thumbnail, default: {} })
  thumbnails?: { [key in ThumbnailKey]: Thumbnail };

  @prop({ ref: () => Channel })
  channelId?: Ref<Channel>;

  @prop({ ref: () => VideoCategory })
  categoryId?: Ref<VideoCategory>;

  @prop({ type: () => VideoStatus, default: {} })
  status?: VideoStatus;

  @prop({ type: () => ContentDetails, default: {} })
  contentDetails?: ContentDetails;

  @prop({ type: () => LiveStreamingDetails, default: {} })
  liveStreamingDetails?: LiveStreamingDetails;

  @prop({ type: () => VideoStatistics, default: {} })
  statistics?: VideoStatistics;

  // Functions here ...

  // TODO: this should be a virtual populate method prop to get channel details
  public get channelDetails() {
    return {
      channelId: this.channelId || "xx-unidentified-xx",
      channelTitle: "Channel Title",
    };
  }
}
