import { Router } from "express";
import makeCallback from "@/utils/express-callback";

import { deleteComment } from "./controllers";

const commentsRouter = Router();
commentsRouter.delete("/:id", makeCallback(deleteComment));

export default commentsRouter;
