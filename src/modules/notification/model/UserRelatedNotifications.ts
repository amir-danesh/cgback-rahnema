import { UserId } from "../../user/types/userIdType";
import { EFollowNotification } from "../entity/notificationUser.entity";

export interface UserRelatedNotificationsModel{
    sourceUserId: UserId;
    targetUserId: UserId;
    action: EFollowNotification;
    createdAt: Date;
}

export const isUserRelatedNotification = (notification: any): notification is UserRelatedNotificationsModel => {
    return 'sourceUserId' in notification && 'targetUserId' in notification && 'action' in notification && 'createdAt' in notification;
  }