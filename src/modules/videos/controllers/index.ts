import { removeVideo, insertVideo } from "../use-cases";

import makeDeleteVideo from "./delete-video";
import makePostVideo from "./post-video";
import makeUploadVideo from "./upload-video";

const deleteVideo = makeDeleteVideo({ removeVideo });
const postVideo = makePostVideo({ insertVideo });
const uploadVideo = makeUploadVideo();

const videosContoller = Object.freeze({ deleteVideo, postVideo, uploadVideo });

export type RemoveVideoServiceHandler = typeof removeVideo;
export type InsertVideoServiceHandler = typeof insertVideo;

export { deleteVideo, postVideo, uploadVideo };
export default videosContoller;
