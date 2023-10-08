import { DataSource, DeleteResult, Repository } from "typeorm";
import { FollowEntity, FollowStatus } from "./entity/follow.entity";
import { UserId } from "../user/types/userIdType";
import { UserEntity } from "../user/entity/user.entity";
import {
  FollowStateNotificationEntity,
  EFollowNotification,
} from "../notification/entity/notificationUser.entity";

export interface FollowData {
  userId: UserId;
  followedUserId: UserId;
  state: FollowStatus;
}

export interface DenyFollowData {
  userId: UserId;
  followedUserId: UserId;
}

export class FollowRepository {
  private followRepo: Repository<FollowEntity>;
  constructor(private AppDataSource: DataSource) {
    this.followRepo = AppDataSource.getRepository(FollowEntity);
  }
  async follow(data: FollowData) {
    await this.AppDataSource.manager.transaction(async (manager) => {
      const followRepo = manager.getRepository(FollowEntity);
      const userRepo = manager.getRepository(UserEntity);
      const followStateNotificationRepo = manager.getRepository(
        FollowStateNotificationEntity
      );

      await followRepo.save({
        followedUserId: data.followedUserId,
        userId: data.userId,
        state: data.state,
      });

      if (data.state !== FollowStatus.PENDING) {
        await userRepo.update(
          { id: data.userId },
          { followingCount: () => "followingCount + 1" }
        );
        await userRepo.update(
          { id: data.followedUserId },
          { followerCount: () => "followerCount + 1" }
        );
      }

      const followNotificationResponse = await followStateNotificationRepo.save(
        {
          sourceUserId: data.followedUserId,
          targetUserId: data.userId,
          action:
            data.state === FollowStatus.FOLLOWED
              ? EFollowNotification.FOLLOWED
              : EFollowNotification.FOLLOW_REQUESTED,
        }
      );
    });
  }

  async accept(data: FollowData) {
    await this.AppDataSource.manager.transaction(async (manager) => {
      const followRepo = manager.getRepository(FollowEntity);
      const userRepo = manager.getRepository(UserEntity);
      const followStateNotificationRepo = manager.getRepository(
        FollowStateNotificationEntity
      );

      await followRepo.update(
        {
          followedUserId: data.followedUserId,
          userId: data.userId,
        },
        { state: data.state }
      );

      await userRepo.update(
        { id: data.userId },
        { followingCount: () => "followingCount + 1" }
      );
      await userRepo.update(
        { id: data.followedUserId },
        { followerCount: () => "followerCount + 1" }
      );

      const isFollowExists = await followStateNotificationRepo.findOneBy({
        sourceUserId: data.followedUserId,
        targetUserId: data.userId,
      });

      if (isFollowExists?.action === EFollowNotification.FOLLOW_REQUESTED) {
        await followStateNotificationRepo.update(
          { sourceUserId: data.followedUserId, targetUserId: data.userId },
          { action: EFollowNotification.FOLLOWED }
        );
        await followStateNotificationRepo.save({
          sourceUserId: data.userId,
          targetUserId: data.followedUserId,
          action: EFollowNotification.FOLLOW_ACCEPTED,
        });
      }
    });
  }
  async unfollow(data: FollowData) {
    await this.AppDataSource.manager.transaction(async (manager) => {
      const followRepo = manager.getRepository(FollowEntity);
      const userRepo = manager.getRepository(UserEntity);
      const followStateNotificationRepo = manager.getRepository(
        FollowStateNotificationEntity
      );

      await followRepo.delete({
        followedUserId: data.followedUserId,
        userId: data.userId,
      });

      if (data.state !== FollowStatus.PENDING) {
        await userRepo.update(
          { id: data.userId },
          { followingCount: () => "followingCount - 1" }
        );
        await userRepo.update(
          { id: data.followedUserId },
          { followerCount: () => "followerCount - 1" }
        );
      }

      await followStateNotificationRepo.delete({
        sourceUserId: data.followedUserId,
        targetUserId: data.userId,
      });
    });
  }

  async deny(data: DenyFollowData) {
    let dbResponse: Promise<DeleteResult>;
    await this.AppDataSource.manager.transaction(async (manager) => {
      const followRepo = manager.getRepository(FollowEntity);
      const followStateNotificationRepo = manager.getRepository(
        FollowStateNotificationEntity
      );

      await followRepo.delete({
        followedUserId: data.followedUserId,
        userId: data.userId,
      });

      await followStateNotificationRepo.delete({
        sourceUserId: data.followedUserId,
        targetUserId: data.userId,
        action: EFollowNotification.FOLLOW_REQUESTED,
      });
    });
  }

  async getFollowExists(followedId: UserId, userId: UserId) {
    return await this.followRepo.findOneBy({
      userId: userId,
      followedUserId: followedId,
    });
  }
  async getFollowersByUserId(followedUserId: UserId) {
    return await this.followRepo.find({
      where: { followedUserId, state: FollowStatus.FOLLOWED },
    });
  }

  async getFollowingsByUserId(userId: UserId) {
    return await this.followRepo.find({
      where: { userId, state: FollowStatus.FOLLOWED },
    });
  }

  async isUserFollowed(userId: UserId, anotherUserId: UserId) {
    return await this.followRepo.find({
      where: { userId, followedUserId: anotherUserId, state:FollowStatus.FOLLOWED },
    });
  }
  async isUserFollowedPending(userId: UserId, anotherUserId: UserId) {
    return await this.followRepo.find({
      where: { userId, followedUserId: anotherUserId, state:FollowStatus.PENDING },
    });
  }
}
