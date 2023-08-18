import { VideosDbType } from ".";

export default function makeListVideos({ videosRepo }: { videosRepo: VideosDbType }) {
  return async function listVideos({
    sortBy,
    limit,
    page,
    videoIds,
  }: {
    sortBy: "date" | "relevance" | "viewCount";
    page: number;
    limit: number;
    videoIds: string[];
  }) {
    return videosRepo.findAll({ order: sortBy, limit, page, id: videoIds });
  };
}
