import { BadRequestError } from "../../../utility/errors";
import { BookmarkRepository } from "../../bookmark/bookmark.repository";
import { FollowStatus } from "../../follow/entity/follow.entity";
import { FollowRepository } from "../../follow/follow.repository";
import { BlockUserRepository } from "../../user/blockedUsers/blockUser.repository";
import { User } from "../../user/model/user";
import { PrivatePage } from "../../user/types/isPrivateType";
import { UserId } from "../../user/types/userIdType";
import { UserRepository } from "../../user/user.repository";
import { PostEntity } from "../entity/post.entity";
import { Post } from "../model/post";
import { PostLikeRepository } from "../postLike/postLike.repository";
import { TagName } from "./model/tag-name";
import { TagRepository } from "./tag.repository";

export class TagService {
  constructor(
    private tagRepo: TagRepository,
    private userRepo: UserRepository,
    private blockRepo: BlockUserRepository,
    private followRepo: FollowRepository,
    private postLikerepo: PostLikeRepository,
    private bookmarkRepo: BookmarkRepository
  ) {}

  async searchPostByTag(tag: TagName, userId: UserId) {
    const tagWithPost = await this.tagRepo.getPostsByTagName(tag);
    if (!tagWithPost) {
      return {
        statusCode: 200,
        response: {
          message: "get posts successfully",
          data: [],
        },
      };
    }
    const posts = await Promise.all(
      tagWithPost.posts.slice(-30).map(async (post) => {
        if (!(await this.checkPrivateAndFollowing(post, userId))) {
          return null;
        }

        if (!(await this.checkBlocked(post, userId))) {
          return null;
        }

        return {
          ...post,
          user: post.user.username,
          images: post.images[0].urlImage,
          imageCount: post.images.length,
          isliked: await this.postLikerepo.isUserLikedPost(post.id, userId),
          isBookmarked: await this.bookmarkRepo.isPostBookmarked(
            post.id,
            userId
          ),
        };
      })
    );
    const visiblePosts = posts.filter((post) => post !== null);
    return {
      statusCode: 200,
      response: {
        message: "get posts successfully",
        data: visiblePosts,
      },
    };
  }
  private async checkPrivateAndFollowing(post: PostEntity, userId: UserId) {
    const postOwner = await this.userRepo.getUserById(post.userId);
    if (post.userId !== userId) {
      if (postOwner && postOwner.isPrivate) {
        const isUserFollower = await this.followRepo.getFollowExists(
          post.userId,
          userId
        );
        if (!isUserFollower || isUserFollower.state === FollowStatus.PENDING) {
          return false;
        }
      }
    }
    return true;
  }
  private async checkBlocked(post: PostEntity, userId: UserId) {
    const isUserBlocked = await this.blockRepo.isUserBlocked(
      post.userId,
      userId
    );
    if (isUserBlocked) {
      return false;
    }
    return true;
  }
}
