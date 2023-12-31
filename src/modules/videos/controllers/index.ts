import { removeVideo, insertVideo, listVideos } from "../use-cases";

import makeDeleteVideo from "./delete-video";
import makePostVideo from "./post-video";
import makeGetVideos from "./get-videos";
import makeUploadVideo from "./upload-video";

const deleteVideo = makeDeleteVideo({ removeVideo });
const postVideo = makePostVideo({ insertVideo });
const uploadVideo = makeUploadVideo();
const getVideos = makeGetVideos({ listVideos });

const videosContoller = Object.freeze({ deleteVideo, postVideo, uploadVideo });

export type RemoveVideoServiceHandler = typeof removeVideo;
export type InsertVideoServiceHandler = typeof insertVideo;
export type ListVideosServiceHandler = typeof listVideos;

export { deleteVideo, postVideo, uploadVideo, getVideos };
export default videosContoller;
