/**
 * Video uploaded here must conform to the below rules
 *
 * Maximum file size: 200MB
 * Accepted Media MIME types: video/*, application/octet-stream
 */

interface Video {
  title: string;
  description: string;
  isPrivate?: boolean;
}

interface VideoInput {
  title: string;
  description: string;
}

export default function buildMakeVideo({
  validateInput,
  makeRandomString,
}: {
  validateInput: (input: VideoInput) => boolean;
  makeRandomString(): Promise<string>;
}) {
  return function makeVideo({ title, description, isPrivate = false }: Video) {
    // validate input for video metadata
    validateInput({
      title,
      description,
    });

    return Object.freeze({
      getTitle: () => title,
      getDescription: () => description,
      getIsPrivate: () => isPrivate,
      getEtag: () => makeEtag(),

      markPrivate: () => {
        isPrivate = true;
      },
    });

    async function makeEtag() {
      return makeRandomString();
    }
  };
}
