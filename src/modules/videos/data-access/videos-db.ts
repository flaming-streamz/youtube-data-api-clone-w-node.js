import { DatabaseModelsType } from "@/models/index";
import { Video } from "@/schemas/video-schema";
import { ResourceObjectId } from "@/utils/object-id";
import { DocumentType } from "@typegoose/typegoose";
import { FilterQuery } from "mongoose";
import { GeneratePaginationCodesHandler } from ".";

interface MakeVideosDbFactory {
  database: DatabaseModelsType;
  generatePaginationCodes: GeneratePaginationCodesHandler;
}

export default function makeVideosDb({ database, generatePaginationCodes }: MakeVideosDbFactory) {
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

    // Populate
    query = query.populate("commentsCount");

    const results = await query;
    const totalResults = await videosModel.countDocuments({ ...filterQuery });

    const { tokens } = generatePaginationCodes(page);

    const pagination: Partial<{
      [key in "nextPageToken" | "nextPageNumber" | "prevPageToken" | "prevPageNumber"]: number | string;
    }> = {};
    if (endIndex < totalResults) {
      pagination["nextPageNumber"] = page + 1;
      pagination["nextPageToken"] = tokens.nextPageToken;
    }
    if (startIndex > 0) {
      pagination["prevPageNumber"] = page - 1;
      pagination["prevPageToken"] = tokens.prevPageToken;
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
