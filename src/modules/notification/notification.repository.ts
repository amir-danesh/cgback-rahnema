import { DataSource, Repository } from "typeorm"
import { FollowStateNotificationEntity } from "./entity/notificationUser.entity";
import { CommentNotificationEntity } from "./entity/notificationComment.entity";
import { PostLikeNotificationEntity } from "./entity/notificationPostLike.entity";
import { UserId } from "../user/types/userIdType";
import { UserRelatedNotificationsModel } from "./model/UserRelatedNotifications";
import { CommentNotificationsModel } from "./model/CommentNotifications";
import { PostLikeNotificationsModel } from "./model/PostLikeNotifications";
import { PaginationBy10 } from "./types/pagination.types";

export type CombinedNotifications = (UserRelatedNotificationsModel | CommentNotificationsModel | PostLikeNotificationsModel)[];

export class NotificationRepository {
  private userNotificationRepo: Repository<FollowStateNotificationEntity>;
  private commentNotificationRepo: Repository<CommentNotificationEntity>;
  private postLikeNotificationRepo: Repository<PostLikeNotificationEntity>;

  constructor(AppDataSource: DataSource) {
    this.userNotificationRepo = AppDataSource.getRepository(FollowStateNotificationEntity);
    this.commentNotificationRepo = AppDataSource.getRepository(CommentNotificationEntity)
    this.postLikeNotificationRepo = AppDataSource.getRepository(PostLikeNotificationEntity)
  }

  private async getUserRelatedNotifications(userId: UserId, offset: number, pageSize: number): Promise<UserRelatedNotificationsModel[]> {
    const userRelatedNotifications = await this.userNotificationRepo.find({
      where: { sourceUserId: userId },
      order: { createdAt: 'DESC' },
      skip: offset,
      take: pageSize,
    });

    return userRelatedNotifications
  }

  private async getCommentNotifications(userId: UserId, offset: number, pageSize: number): Promise<CommentNotificationsModel[]> {
    const commentNotifications = await this.commentNotificationRepo.find({
      where: { sourceUserId: userId },
      order: { createdAt: 'DESC' },
      skip: offset,
      take: pageSize,
    });

    return commentNotifications
  }

  private async postLikeNotifications(userId: UserId, offset: number, pageSize: number): Promise<PostLikeNotificationsModel[]> {
    const postLikeNotifications = await this.postLikeNotificationRepo.find({
      where: { sourceUserId: userId },
      order: { createdAt: 'DESC' },
      skip: offset,
      take: pageSize,
    });
    
    return postLikeNotifications
  }

  private sortNotifications(notifications: CombinedNotifications): CombinedNotifications {
    return notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getNotificationsWithPagination(userId: UserId, page: PaginationBy10): Promise<(UserRelatedNotificationsModel | CommentNotificationsModel | PostLikeNotificationsModel)[]>{
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    const userNotifications = await this.getUserRelatedNotifications(userId, offset, pageSize);

    const commentNotifications = await this.getCommentNotifications(userId, offset, pageSize);

    const postLikeNotifications = await this.postLikeNotifications(userId, offset, pageSize)

    const allNotifications: CombinedNotifications = [...userNotifications, ...commentNotifications, ...postLikeNotifications];
    const sortedNotifications: CombinedNotifications = this.sortNotifications(allNotifications)

    const paginatedNotifications = sortedNotifications.slice(0, pageSize);

    return paginatedNotifications;
  }

}
