import { BookmarkService } from "../modules/bookmark/bookmark.service";
import { CloseFriendsService } from "../modules/closefriends/closeFriends.service";
import { CollegegramiesService } from "../modules/collegegramies/collegegramies.service";
import { CommentLikeService } from "../modules/comment-like/commentLike.service";
import { CommentService } from "../modules/comment/comment.service";
import { FollowService } from "../modules/follow/follow.service";
import { HomepageService } from "../modules/homepage/homepage.service";
import { NotificationService } from "../modules/notification/notification.service";
import { PostService } from "../modules/post/post.service";
import { PostLikeService } from "../modules/post/postLike/postLike.service";
import { TagService } from "../modules/post/tag/tag.service";
import { ShowImageService } from "../modules/show-image/show-image.service";
import { BlockUserService } from "../modules/user/blockedUsers/blockUser.service";
import { UserForgetPasswordService } from "../modules/user/forgetPassword/user.forget.password.service";
import { UserService } from "../modules/user/user.service";
import { initRepos } from "./init-repo";

export const initServices = (repos: ReturnType<typeof initRepos>) => {
  const userService = new UserService(repos.userRepo);
  const userForgetPasswordService = new UserForgetPasswordService(
    repos.userForgetPasswordRepo,
    userService
  );
  const followService = new FollowService(repos.followRepo, repos.userRepo,repos.blockUserRepo);

  const blockUserService = new BlockUserService(
    repos.blockUserRepo,
    userService,
    repos.followRepo
  );
  const postLikeService = new PostLikeService(repos.postLikeRepo);

  const tagService = new TagService(
    repos.tagRepo,
    repos.userRepo,
    repos.blockUserRepo,
    repos.followRepo,
    repos.postLikeRepo,
    repos.bookmarkRepo
  );
  const postService = new PostService(
    repos.postRepo,
    repos.userRepo,
    repos.tagRepo,
    repos.postImageRepo,
    repos.postLikeRepo,
    repos.bookmarkRepo
  );
  const bookmarkService = new BookmarkService(repos.bookmarkRepo, postService);
  const commentLikeService = new CommentLikeService(
    repos.commentLikeRepo,
    repos.commentRepo,
    repos.userRepo
  );
  const commentService = new CommentService(
    repos.commentRepo,
    repos.postRepo,
    repos.userRepo,
    repos.commentLikeRepo
  );
  const showImageService = new ShowImageService(repos.showImageRepo);

  const closeFriendsService = new CloseFriendsService(
    repos.closeFriendsRepo,
    userService
  );
  const homepageService = new HomepageService(
    postService,
    followService,
    blockUserService,
    repos.postLikeRepo,
    repos.bookmarkRepo
  );
  const collegegramiesService = new CollegegramiesService(
    postService,
    followService,
    blockUserService,
    userService
  );
  const notificationService = new NotificationService(
    repos.notificationRepo,
    repos.userRepo,
    repos.postRepo,
    repos.commentRepo,
    repos.followRepo
  );
  return {
    userService,
    userForgetPasswordService,
    followService,
    blockUserService,
    postLikeService,
    tagService,
    postService,
    bookmarkService,
    commentLikeService,
    commentService,
    showImageService,
    closeFriendsService,
    homepageService,
    collegegramiesService,
    notificationService,
  };
};
