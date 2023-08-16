import videosDb from "../data-access";
import makeRemoveVideo from "./remove-video";

export type VideosDbType = typeof videosDb;
const removeVideo = makeRemoveVideo({ videosRepo: videosDb });

export { removeVideo };
export default Object.freeze({ removeVideo });
