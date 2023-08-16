/**
 * Video uploaded here must conform to the below rules
 *
 * Maximum file size: 200MB
 * Accepted Media MIME types: video/*, application/octet-stream
 */

interface Video {
  title: string;
  description: string;
}

interface VideoInput {
  title: string;
  description: string;
}

export default function buildMakeVideo({ validateInput }: { validateInput: (input: VideoInput) => boolean }) {
  return function makeVideo({ title, description }: Video) {
    // validate input for video metadata
    validateInput({
      title,
      description,
    });

    return Object.freeze({
      getTitle: () => title,
      getDescription: () => description,
    });
  };
}
