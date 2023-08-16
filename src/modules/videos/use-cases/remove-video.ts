import { VideosDbType } from "./";

interface VideoInfo {
  id: string;
}

export default function makeRemoveVideo({ videosRepo }: { videosRepo: VideosDbType }) {
  return async function removeVideo(videoInfo: VideoInfo) {
    if (!videoInfo.id) throw new Error("Provide a video Id.");

    const videoToDelete = await videosRepo.findById(videoInfo.id);
    if (!videoToDelete) return deletedNothing();

    const result = await videosRepo.remove(videoInfo.id);
    return {
      deletedCount: result.deletedCount,
      softDelete: false,
      message: "Video has been deleted.",
    };
  };

  function deletedNothing() {
    return {
      deletedCount: 0,
      softDelete: false,
      message: "Video not found, nothing deleted.",
    };
  }
}
