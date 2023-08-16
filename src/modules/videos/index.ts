import { Router } from "express";
import makeCallback from "@/utils/express-callback";

import { deleteVideo } from "./controllers";

const videosRouter = Router();
videosRouter.delete("/", makeCallback(deleteVideo));

export default videosRouter;
