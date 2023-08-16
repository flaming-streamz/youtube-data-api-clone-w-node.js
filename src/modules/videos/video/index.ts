// import z from 'zod';

import buildMakeVideo from "./build-make-video";

const makeVideo = buildMakeVideo({ validateInput });

export default makeVideo;

function validateInput({ title }: { title: string }) {
  if (!title) return false;
  return true;
}