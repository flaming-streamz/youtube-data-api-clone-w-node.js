import { Router } from "express";
import makeCallback from "@/utils/express-callback";

import { deleteVideo, postVideo, uploadVideo, getVideos } from "./controllers";

// https://www.youtubeclone.com/api/v1/videos
const videosRouter = Router();
videosRouter.delete("/", makeCallback(deleteVideo));
videosRouter.post("/", makeCallback(postVideo));
videosRouter.post("/upload", makeCallback(uploadVideo));
videosRouter.get("/", makeCallback(getVideos));

export default videosRouter;
