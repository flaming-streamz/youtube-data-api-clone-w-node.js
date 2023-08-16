import type { VideosDbType } from "./";
import makeVideo from "../video";

interface VideoInfo {
  title: string;
  description: string;
}

export default function makeInsertVideo({ videosRepo }: { videosRepo: VideosDbType }) {
  return async function insertVideo(videoInfo: VideoInfo) {
    console.log(videoInfo);
    const video = makeVideo({ title: videoInfo.title, description: videoInfo.description });

    return videosRepo.insert({
      title: video.getTitle(),
      description: video.getDescription(),
    });
  };
}
