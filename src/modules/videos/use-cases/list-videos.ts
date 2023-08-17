import { VideosDbType } from ".";

export default function makeListVideos({ videosRepo }: { videosRepo: VideosDbType }) {
  return async function listVideos({ sortBy }: { sortBy: "date" | "relevance" | "viewCount" }) {
    return videosRepo.findAll({ order: sortBy });
  };
}
