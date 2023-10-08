import { WholeNumber } from "../../data/wholeNumber";
import { HttpResponseType } from "../../routes/utils/HTTPResponse";
import { FollowService } from "../follow/follow.service";
import { PostEntity } from "../post/entity/post.entity";
import { PostService } from "../post/post.service";
import { BlockUserService } from "../user/blockedUsers/blockUser.service";
import { UserEntity } from "../user/entity/user.entity";
import { UserId } from "../user/types/userIdType";
import { UserService } from "../user/user.service";

export class CollegegramiesService {
  constructor(
    private postService: PostService,
    private followService: FollowService,
    private blockService: BlockUserService,
    private userService: UserService
  ) {}

  async getCollegegramies(
    userId: UserId,
    pageIndention: WholeNumber
  ): Promise<HttpResponseType> {
    const following = (
      await this.followService.getFollowingsByUserId(userId)
    ).map((following) => following.followedUserId);
    const blockedBy = (await this.blockService.blockedlist(userId)).map(
      (blocked) => blocked.user_id
    );
    const blocked = (await this.blockService.blockedByList(userId)).map(
      (blocked) => blocked.blockUser_id
    );
    const notFollowing = await this.userService.getAllowedUsers([
      ...following,
      ...blockedBy,
      ...blocked,
      userId,
    ]);
    const userPage = notFollowing.slice(
      (pageIndention - 1) * 10,
      pageIndention * 10
    );

    const collegegramies = await Promise.all(
      userPage.map((user) => this.refactoreResponse(user))
    );
    const response = collegegramies.filter(user => user.posts.length > 0);
    return {
      statusCode: 200,
      response: {
        message: "get collegegramies successfully.",
        data: {
          collegegramies: response,
        },
      },
    };
  }
  async refactoreResponse(user: UserEntity) {
    const response = {
      ...user,
      posts: (await this.postService.getPostsForCollegegramies(user.id)).map(
        (post) => this.postWithOneImage(post)
      ),
    };
    return response;
  }
  postWithOneImage(post: PostEntity) {
    return { ...post, images: post.images[0] };
  }
}
