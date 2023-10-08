import { UserId } from "../../user/types/userIdType";
import { PostId } from "../../post/model/post-id";

export interface PostLikeNotificationsModel{
    sourceUserId: UserId;
    targetUserId: UserId;
    postId: PostId;
    createdAt: Date;
}

export const isPostLikeNotification = (notification: any): notification is PostLikeNotificationsModel => {
    return 'sourceUserId' in notification && 'targetUserId' in notification && 'postId' in notification && 'createdAt' in notification;
  }