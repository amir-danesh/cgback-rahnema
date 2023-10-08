import { date } from "zod";
import { BadRequestError } from "../../utility/errors";
import { PrivatePage } from "../user/types/isPrivateType";
import { UserId } from "../user/types/userIdType";
import { UserRepository } from "../user/user.repository";
import { FollowStatus } from "./entity/follow.entity";
import { FollowRepository } from "./follow.repository";
import { BlockUserRepository } from "../user/blockedUsers/blockUser.repository";

export class FollowService {
  constructor(
    private followRepo: FollowRepository,
    private userRepo: UserRepository,
    private blockRepo: BlockUserRepository
  ) {}

  async followUser(followedId: UserId, userId: UserId) {
    const followedUser = await this.userRepo.getUserById(followedId);

    if (!followedUser) throw new BadRequestError("target user does not exist");
    if (userId === followedId)
      throw new BadRequestError("user cannot follow itself");
    if (await this.followRepo.getFollowExists(followedId, userId))
      throw new BadRequestError("Follow already exists");
    if (await this.blockRepo.isUserBlocked(followedId, userId))
      throw new BadRequestError("user is blocked");
    const data = {
      userId: userId,
      followedUserId: followedId,
      state: this.getFollowStatus({
        isPrivate: followedUser.isPrivate as boolean,
      }),
    };
    await this.followRepo.follow(data);

    return {
      statusCode: 201,
      response: {
        message: "user followed successfully",
      },
    };
  }

  async unFollowUser(followedId: UserId, userId: UserId) {
    const followedUser = await this.userRepo.getUserById(followedId);

    if (!followedUser) {
      throw new BadRequestError("User not found");
    }

    const isExsistFollow = await this.followRepo.getFollowExists(
      followedId,
      userId
    );

    if (!isExsistFollow) {
      throw new BadRequestError("can not unfollow this user");
    }

    const data = {
      userId: userId,
      followedUserId: followedId,
      state: isExsistFollow.state,
    };

    await this.followRepo.unfollow(data);
    return {
      statusCode: 200,
      response: {
        message: "user unfollowed successfully",
      },
    };
  }

  async acceptFollowUser(followedId: UserId, userId: UserId) {
    const followRow = await this.followRepo.getFollowExists(userId, followedId);

    if (!followRow || followRow.state !== FollowStatus.PENDING) {
      throw new BadRequestError("can not accept follow this user");
    }

    const data = {
      userId: followedId,
      followedUserId: userId,
      state: FollowStatus.FOLLOWED,
    };

    await this.followRepo.accept(data);
    return {
      statusCode: 200,
      response: {
        message: "user accept-follows successfully",
      },
    };
  }
  async denyFollowUser(followedId: UserId, userId: UserId) {
    const followRow = await this.followRepo.getFollowExists(userId, followedId);

    if (!followRow || followRow.state !== FollowStatus.PENDING) {
      throw new BadRequestError("can not deny follow this user");
    }

    const data = {
      userId: followedId,
      followedUserId: userId,
    };

    await this.followRepo.deny(data);
    return {
      statusCode: 200,
      response: {
        message: "user deny-follows successfully",
      },
    };
  }

  async followersList(userId: UserId) {
    const followesId = await this.followRepo.getFollowersByUserId(userId);
    const userIds = followesId.map((item) => item.userId);
    const users = await this.userRepo.getusersByIds(userIds);
    return {
      statusCode: 200,
      response: {
        message: "get all followers successfully",
        data: users,
      },
    };
  }
  async followingList(userId: UserId) {
    const followesId = await this.followRepo.getFollowingsByUserId(userId);
    const userIds = followesId.map((item) => item.followedUserId);
    const users = await this.userRepo.getusersByIds(userIds);
    return {
      statusCode: 200,
      response: {
        message: "get all followings successfully",
        data: users,
      },
    };
  }

  private getFollowStatus(followedUser: { isPrivate: boolean }): FollowStatus {
    return followedUser.isPrivate
      ? FollowStatus.PENDING
      : FollowStatus.FOLLOWED;
  }

  getFollowingsByUserId(userId: UserId) {
    return this.followRepo.getFollowingsByUserId(userId);
  }
  async isFollowedBy(userId: UserId, anotherUserId: UserId): Promise<boolean> {
    return (await this.followRepo.isUserFollowed(userId, anotherUserId))
      ? true
      : false;
  }
}
