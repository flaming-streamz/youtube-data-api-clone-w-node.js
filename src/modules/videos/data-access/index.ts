import Database from "@/models/index";
import makeVideosDb from "./videos-db";

const videosDb = makeVideosDb({ database: Database });

export default videosDb;
