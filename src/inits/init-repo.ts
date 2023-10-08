import { DataSource } from "typeorm";
import { UserRepository } from "../modules/user/user.repository";
import { UserForgetPasswordRepository } from "../modules/user/forgetPassword/user.forget.password.repository";
import { FollowRepository } from "../modules/follow/follow.repository";
import { BlockUserRepository } from "../modules/user/blockedUsers/blockUser.repository";
import { PostLikeRepository } from "../modules/post/postLike/postLike.repository";
import { PostImageRepository } from "../modules/post/postImage/postImage.repository";
import { BookmarkRepository } from "../modules/bookmark/bookmark.repository";
import { PostRepository } from "../modules/post/post.repository";
import { CommentRepository } from "../modules/comment/comment.repository";
import { ShowImageRepository } from "../modules/show-image/show-image.repository";
import { CloseFriendsRepository } from "../modules/closefriends/closeFriends.repository";
import { NotificationRepository } from "../modules/notification/notification.repository";
import { TagRepository } from "../modules/post/tag/tag.repository";
import { CommentLikeRepository } from "../modules/comment-like/commentLike.repository";

export const initRepos = (appDataSource: DataSource) => {
  const userRepo = new UserRepository(appDataSource);
  const userForgetPasswordRepo = new UserForgetPasswordRepository(
    appDataSource
  );
  const followRepo = new FollowRepository(appDataSource);
  const blockUserRepo = new BlockUserRepository(appDataSource);
  const postLikeRepo = new PostLikeRepository(appDataSource);
  const postImageRepo = new PostImageRepository(appDataSource);
  const bookmarkRepo = new BookmarkRepository(appDataSource);
  const postRepo = new PostRepository(appDataSource);
  const commentRepo = new CommentRepository(appDataSource);
  const showImageRepo = new ShowImageRepository(appDataSource);
  const closeFriendsRepo = new CloseFriendsRepository(appDataSource);
  const notificationRepo = new NotificationRepository(appDataSource);
  const tagRepo = new TagRepository(appDataSource);
  const commentLikeRepo = new CommentLikeRepository(appDataSource);

  return {
    userRepo,
    userForgetPasswordRepo,
    followRepo,
    blockUserRepo,
    postLikeRepo,
    postImageRepo,
    bookmarkRepo,
    postRepo,
    commentRepo,
    showImageRepo,
    closeFriendsRepo,
    notificationRepo,
    tagRepo,
    commentLikeRepo,
  };
};
