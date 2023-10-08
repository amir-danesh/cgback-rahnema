import "reflect-metadata";
import {DataSource} from "typeorm";
import dotenv from "dotenv-flow";
import {UserEntity} from "./modules/user/entity/user.entity";
import {UserForgetPasswordEntity} from "./modules/user/forgetPassword/entity/user.forgetPassword.entity";
import {PostEntity} from "./modules/post/entity/post.entity";
import {PostImageEntity} from "./modules/post/postImage/entity/postImage.entity";
import {PostLikeEntity} from "./modules/post/postLike/entity/postLike.entity";
import {TagEntity} from "./modules/post/tag/entity/tag.entity";
import {BlockedUserEntity} from "./modules/user/blockedUsers/entity/blockedUser.entity";
import {CommentEntity} from "./modules/comment/entity/comment.entity";
import {CommentLikeEntity} from "./modules/comment-like/entity/commentLike.entity";
import {FollowEntity} from "./modules/follow/entity/follow.entity";
import {BookmarkEntity} from "./modules/bookmark/entity/bookmark.entity";
import { FollowStateNotificationEntity } from "./modules/notification/entity/notificationUser.entity";
import { CommentNotificationEntity } from "./modules/notification/entity/notificationComment.entity";
import { PostLikeNotificationEntity } from "./modules/notification/entity/notificationPostLike.entity";
import {CloseFriendsEntity} from "./modules/closefriends/entity/closeFriends.entity";

dotenv.config();
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  migrationsRun: true,
  insecureAuth: true,
  logging: false,
  entities: [
    UserEntity,
    UserForgetPasswordEntity,
    PostEntity,
    PostImageEntity,
    TagEntity,
    PostLikeEntity,
    BlockedUserEntity,
    CommentEntity,
    CommentLikeEntity,
    FollowEntity,
    BookmarkEntity,
    FollowStateNotificationEntity,
    CommentNotificationEntity,
    PostLikeNotificationEntity,
    CloseFriendsEntity
  ],
  migrations: ["./src/migrations/*.ts"],
  subscribers: [],
  charset : "utf8mb4",
});
