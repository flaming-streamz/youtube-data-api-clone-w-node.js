import videosDb from "../data-access";
import makeRemoveVideo from "./remove-video";
import makeInsertVideo from "./insert-video";
import makeListVideos from "./list-videos";

export type VideosDbType = typeof videosDb;

const insertVideo = makeInsertVideo({ videosRepo: videosDb });
const removeVideo = makeRemoveVideo({ videosRepo: videosDb });
const listVideos = makeListVideos({ videosRepo: videosDb });

export { insertVideo, removeVideo, listVideos };
export default Object.freeze({ insertVideo, listVideos, removeVideo });
