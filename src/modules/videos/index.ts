import { Router } from "express";
import makeCallback from "@/utils/express-callback";

import { deleteVideo, postVideo } from "./controllers";

// https://www.youtubeclone.com/api/v1/videos
const videosRouter = Router();
videosRouter.delete("/", makeCallback(deleteVideo));
videosRouter.post("/upload", makeCallback(postVideo));

export default videosRouter;
