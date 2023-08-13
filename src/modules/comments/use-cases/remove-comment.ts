import { ResourceObjectId } from "@/utils/object-id";
import { CommentsDbType } from "../data-access";

export default function makeRemoveComment({ commentsRepo }: { commentsRepo: CommentsDbType }) {
  return async function removeComment({ id }: { id: ResourceObjectId }) {
    if (!id) throw new Error("Please provide comment id.");

    const commentToDelete = await commentsRepo.remove({ id });
  };
}
