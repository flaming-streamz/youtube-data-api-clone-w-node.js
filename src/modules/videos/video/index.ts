import buildMakeVideo from "./build-make-video";

export const makeVideo = buildMakeVideo({ validateInput, makeRandomString });
export default makeVideo;

function validateInput({ title }: { title: string }) {
  if (!title) return false;
  return true;
}

async function makeRandomString() {
  const { randomBytes } = await import("node:crypto");
  return randomBytes(32).toString("hex");
}
