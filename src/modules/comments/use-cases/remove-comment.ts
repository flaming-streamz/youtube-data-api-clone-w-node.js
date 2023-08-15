import makeComment from "../comment";

import type { ResourceObjectId } from "@/utils/object-id";
import type { CommentsDbType } from "../data-access";

export default function makeRemoveComment({ commentsRepo }: { commentsRepo: CommentsDbType }) {
  return async function removeComment({ id }: { id: ResourceObjectId }) {
    if (!id) throw new Error("Please provide comment id.");

    const commentToDelete = await commentsRepo.findById({ id });

    if (!commentToDelete) return deletedNothing();

    if (await hasRepiles(commentToDelete.id)) {
      return softDelete(commentToDelete);
    }
    
    if (await isOnlyReplyOfDeletedParent(commentToDelete)) {
      return deleteCommentAndParent(commentToDelete);
    }

    return hardDelete(commentToDelete);
  };

  function deletedNothing() {
    return {
      deletedCount: 0,
      softDelete: false,
      message: "Comment not found, nothing deleted.",
    };
  }

  async function hasRepiles({ id: commentId }: { id: ResourceObjectId }) {
    const replies = await commentsRepo.findReplies({ commentId, publishedOnly: false });
    return replies.length > 0;
  }

  async function isOnlyReplyOfDeletedParent(comment: any) {
    if (!comment.replyToId) return false;

    const parent = await commentsRepo.findById({ id: comment.replyToId });

    if (parent && makeComment(parent as any).isDeleted()) {
      const replies = await commentsRepo.findReplies({
        commentId: parent._id as unknown as string,
        publishedOnly: false,
      });

      return replies.length === 1;
    }

    return false;
  }

  async function softDelete(commentInfo: any) {
    // TODO: add proper typescript type
    const toDelete = makeComment({ ...commentInfo });
    toDelete.markDeleted();
    await commentsRepo.update(toDelete.getId(), {});
    return {
      deletedCount: 1,
      softDelete: true,
      message: "Comment has replies, Soft deleted perfomed.",
    };
  }

  async function deleteCommentAndParent(comment: any) {
    await Promise.all([commentsRepo.remove({ id: comment._id }), commentsRepo.remove({ id: comment.replyToId })]);

    return {
      deletedCount: 2,
      softDelete: false,
      message: "Comment and parent deleted.",
    };
  }

  async function hardDelete(comment: any) {
    await commentsRepo.remove({ id: comment._id });
    return {
      deletedCount: 1,
      softDelete: false,
      message: "Comment deleted",
    };
  }
}
