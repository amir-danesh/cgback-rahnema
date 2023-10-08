import { UserId } from "../user/types/userIdType";
import { PostService } from "../post/post.service";
import { FollowService } from "../follow/follow.service";
import { BlockUserService } from "../user/blockedUsers/blockUser.service";
import { HttpResponseType } from "../../routes/utils/HTTPResponse";
import { PostEntity } from "../post/entity/post.entity";
import { PostLikeRepository } from "../post/postLike/postLike.repository";
import { BookmarkRepository } from "../bookmark/bookmark.repository";

export class HomepageService {
  constructor(
    private postService: PostService,
    private followService: FollowService,
    private blockService: BlockUserService,
    private postLikeRepo: PostLikeRepository,
    private bookmarkRepo: BookmarkRepository
  ) {}

  async getHomepage(userId: UserId): Promise<HttpResponseType> {
    const following = await this.followService.getFollowingsByUserId(userId);
    const nonBlocking = (
      await Promise.all(
        following.map(async (followedUser) => {
          const result = await this.blockService.isUserBlocked(
            followedUser.followedUserId,
            userId
          );
          return result ? null : followedUser;
        })
      )
    ).filter(Boolean);
    const posts: PostEntity[] = [];
    for (const followedUser of nonBlocking) {
      if (!followedUser) continue;
      const userPosts = await this.postService.getPostsByUserId(
        followedUser.followedUserId
      );
        const closeFriendsPost = userPosts.filter((post) => !post.isCloseFriend);
        posts.push(...closeFriendsPost);
    }

    const postsWithIsLikedAndIsbookmared = await Promise.all(
      posts.map(async (post) => {
        const isLiked = await this.postLikeRepo.isUserLikedPost(
          post.id,
          userId
        );
        const isBookmarked = await this.bookmarkRepo.isPostBookmarked(
          post.id,
          userId
        );

        return {
          ...post,
          user:(await this.postService.getPostedUser(post.id)).username,
          isLiked,
          isBookmarked,
        };
      })
    );

    return {
      statusCode: 200,
      response: {
        message: "get all non blocking following post successfully.",
        data: postsWithIsLikedAndIsbookmared,
      },
    };
  }
}
