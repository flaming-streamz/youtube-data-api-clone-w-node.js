import { Router } from "express";
import makeCallback from "@/utils/express-callback";

import commentsController from "./controllers";

const commentsRouter = Router();
commentsRouter.delete("/:id", makeCallback(commentsController.deleteComment));

export default commentsRouter;
