import Database from "@/models/index";
import makeVideosDb from "./videos-db";

import makeGeneratePaginationCodes from "./generatePaginationCodes";

const generatePaginationCodes = makeGeneratePaginationCodes();

const videosDb = makeVideosDb({ database: Database, generatePaginationCodes });
export default videosDb;

export type VideosDbType = typeof videosDb;
export type GeneratePaginationCodesHandler = typeof generatePaginationCodes;
