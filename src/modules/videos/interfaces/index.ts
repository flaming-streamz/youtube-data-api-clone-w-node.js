type DateTime = string;

type ThumbnailKey = "default" | "medium" | "high" | "standard" | "maxres";

export interface VideoResource {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  status: Status;
  statistics: Statistics;
  recordingDetails: RecordingDetails;
  fileDetails: FileDetails;
  liveStreamDetails: LiveStreamingDetails;
}

export interface Snippet {
  thumbnails: { [key in ThumbnailKey]: Thumbnail };
  publishedAt: DateTime;
  contentDetails: ContentDetails;
  localizations: Localization;
  tags: string[];
  channelTitle: string;
  channelId: string;
  categoryId: string;
  defaultLanguage: string;
  liveBroadcastContent: "none" | "live" | "upcoming";
}

export interface Thumbnail {
  height: number;
  url: string;
  width: number;
}

export interface ContentDetails {
  duration: number;
  dimension: string;
  definition: "hd" | "sd";
  caption: boolean;
  licensedContent: boolean;
  regionRestriction: {
    allowed: string[] | null;
    blocked: string[] | null;
  };
  contentRating: [];
  project: "360" | "rectangular";
  hasCustomThumbail: boolean;
}

export interface Localization {
  [key: string]: { title: string; description: string };
}

// status
export interface Status {
  uploadStatus: UploadStatus;
  failedReason?: FailedReason;
  rejectionReason?: RejectionReason;
  privacyStatus: PrivacyStatus;
  publishAt: DateTime;
  license: "youtube";
  embeddable: boolean;
  publicStatsViewable: boolean;
  madeForKids: boolean;
  selfDeclaredMadeForKids: boolean;
}

export type UploadStatus = "deleted" | "failed" | "processed" | "rejected" | "uploaded";
export type FailedReason = "codec" | "conversion" | "emptyFile" | "invalidFile" | "tooSmall" | "uploadAborted";
export type RejectionReason =
  | "claim"
  | "copyright"
  | "duplicate"
  | "inappropriate"
  | "legal"
  | "length"
  | "termsOfUse"
  | "trademark"
  | "uploaderAccountClosed"
  | "uploaderAccountSuspended";
export type PrivacyStatus = "private" | "public" | "unlisted";

// statistics
export interface Statistics {
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
}

export interface RecordingDetails {
  recordingDate: DateTime;
}

export interface LiveStreamingDetails {
  actualStartTime: DateTime;
  actualEndTime: DateTime;
  scheduledStartTime: DateTime;
  scheduledEndTime: DateTime;
  concurrentViewers: number;
  activeLiveChatId: string;
}

export interface FileDetails {
  fileName: string;
  fileSize: string;
  fileType: FileType;
  videoStreams: {
    widthPixels: number;
    heightPixels: number;
    frameRateFps: number;
    aspectRatio: number;
    codec: string;
    bitrateBps: number;
    rotation: "clockwise" | "counterClockwise" | "none" | "other" | "upsideDown";
    vendor: string;
  }[];
  audioStreams: {
    channelCount: number;
    codec: string;
    bitrateBps: number;
    vendor: string;
  }[];
  durationMs: number;
  bitrateBps: number;
  creationTime: DateTime;
}

export type FileType = "archive" | "audio" | "document" | "image" | "other" | "project" | "video";
