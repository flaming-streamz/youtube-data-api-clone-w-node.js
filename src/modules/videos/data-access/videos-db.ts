import { DatabaseModelsType } from "@/models/index";
import { Video } from "@/schemas/video-schema";
import { ResourceObjectId } from "@/utils/object-id";
import { DocumentType } from "@typegoose/typegoose";
import { FilterQuery } from "mongoose";

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

  async function findAll({
    order,
    limit,
    page,
  }: {
    order: "date" | "relevance" | "viewCount";
    page: number;
    limit: number;
  }) {
    const filterQuery: FilterQuery<Video> = {};

    let query = videosModel.find({ ...filterQuery });

    // Sort result
    if (order && order === "viewCount") {
      query = query.sort("-statistics.viewCount");
    }
    query = query.sort({ createdAt: "desc" });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    query = query.skip(startIndex).limit(limit);

    const results = await query;
    const totalResults = await videosModel.countDocuments({ ...filterQuery });

    const pagination: Partial<{ [key in "nextPageToken" | "prevPageToken"]: number | string }> = {};
    if (endIndex < totalResults) {
      pagination["nextPageToken"] = page + 1;
    }
    if (startIndex > 0) {
      pagination["prevPageToken"] = page - 1;
    }

    return { results: results.map((result) => result.toJSON()), totalResults, pagination };
  }

  async function findById(id: ResourceObjectId) {
    const result = await videosModel.findById(id);
    return result;
  }

  async function remove(id: ResourceObjectId) {
    const result = await videosModel.deleteOne({ _id: id });
    return { deletedCount: result.deletedCount };
  }

  async function insert(video: Partial<Video>) {
    const result: DocumentType<Video> = await videosModel.create({ ...video });
    return result.toJSON();
  }

  async function update(id: string, videoUpdate: Partial<Video>) {
    await videosModel.updateOne({ _id: id }, { $set: { ...videoUpdate } });
  }

  async function findLikedVideos() {}
  async function findWatchHistory() {}
}
