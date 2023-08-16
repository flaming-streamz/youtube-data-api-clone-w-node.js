import { DatabaseModelsType } from "@/models/index";
import { Video } from "@/schemas/video-schema";
import { ResourceObjectId } from "@/utils/object-id";

export default function makeVideosDb({ database }: { database: DatabaseModelsType }) {
  const { videos: videosModel } = database;

  return Object.freeze({
    findAll,
    findById,
    insert,
    update,
    remove,
    findLikedVideos,
    findWatchHistory,
  });

  async function findAll() {
    const result = await videosModel.find({});
    return result;
  }

  async function findById(id: ResourceObjectId) {
    const result = await videosModel.findById(id);
    return result;
  }

  async function remove(id: ResourceObjectId) {
    const result = await videosModel.deleteOne({ _id: id });
    return { deletedCount: result.deletedCount };
  }

  async function insert(video: Video) {
    const result = await videosModel.create({ ...video });
    return result;
  }

  async function update(id: string, videoUpdate: Partial<Video>) {
    await videosModel.updateOne({ _id: id }, { $set: { ...videoUpdate } });
  }

  async function findLikedVideos() {}
  async function findWatchHistory() {}
}
