interface Video {
  titleText: string;
}

export default function buildMakeVideo({ validateInput }: { validateInput: (input: { title: string }) => boolean }) {
  return function makeVideo({ titleText }: Video) {
    // validate input for video metadata
    validateInput({
      title: titleText,
    });

    return Object.freeze({
      getTitle: () => titleText,
    });
  };
}
