import videosDb from "../data-access";
import makeRemoveVideo from "./remove-video";
import makeInsertVideo from "./insert-video";

export type VideosDbType = typeof videosDb;

const insertVideo = makeInsertVideo({ videosRepo: videosDb });
const removeVideo = makeRemoveVideo({ videosRepo: videosDb });

export { insertVideo, removeVideo };
export default Object.freeze({ insertVideo, removeVideo });
