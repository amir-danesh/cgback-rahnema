import { CommentId } from "../../comment/types/commenIdType";
import { UserId } from "../../user/types/userIdType";

export interface CommentNotificationsModel{
    sourceUserId: UserId;
    targetUserId: UserId;
    commentId: CommentId;
    createdAt: Date;
}

export const isCommentNotification = (notification: any): notification is CommentNotificationsModel => {
  return 'sourceUserId' in notification && 'targetUserId' in notification && 'commentId' in notification && 'createdAt' in notification;
}