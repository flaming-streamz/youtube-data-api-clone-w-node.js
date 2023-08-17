import { VideosDbType } from ".";

export default function makeListVideos({ videosRepo }: { videosRepo: VideosDbType }) {
  return async function listVideos({
    sortBy,
    limit,
    page,
  }: {
    sortBy: "date" | "relevance" | "viewCount";
    page: number;
    limit: number;
  }) {
    return videosRepo.findAll({ order: sortBy, limit, page });
  };
}
