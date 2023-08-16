import { removeVideo } from "../use-cases";

import makeDeleteVideo from "./delete-video";

const deleteVideo = makeDeleteVideo({ removeVideo });
const videosContoller = Object.freeze({ deleteVideo });

export type RemoveVideoServiceHandler = typeof removeVideo;
export { deleteVideo };
export default videosContoller;
