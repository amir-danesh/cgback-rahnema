import express from "express";
import { makeUserRoute } from "./routes/user.route";
import { DataSource } from "typeorm";
import { UserService } from "./modules/user/user.service";
import { UserRepository } from "./modules/user/user.repository";
import { finalErrorHandling } from "./utility/finalErrorHandling";
import swaggerUi from "swagger-ui-express";
import { specs } from "../swagger";
import cookieParser from "cookie-parser";
import { UserForgetPasswordRepository } from "./modules/user/forgetPassword/user.forget.password.repository";
import { UserForgetPasswordService } from "./modules/user/forgetPassword/user.forget.password.service";
import { PostLikeRepository } from "./modules/post/postLike/postLike.repository";
import { PostLikeService } from "./modules/post/postLike/postLike.service";
import { makePostRoute } from "./routes/post.route";
import { PostRepository } from "./modules/post/post.repository";
import { PostService } from "./modules/post/post.service";
import { TagRepository } from "./modules/post/tag/tag.repository";
import { TagService } from "./modules/post/tag/tag.service";
import { PostImageRepository } from "./modules/post/postImage/postImage.repository";
import { BlockUserRepository } from "./modules/user/blockedUsers/blockUser.repository";
import { BlockUserService } from "./modules/user/blockedUsers/blockUser.service";
import { FollowRepository } from "./modules/follow/follow.repository";
import { FollowService } from "./modules/follow/follow.service";
import { CommentRepository } from "./modules/comment/comment.repository";
import { CommentService } from "./modules/comment/comment.service";
import { makeCommentRoute } from "./routes/comment.routes";
import { CommentLikeRepository } from "./modules/comment-like/commentLike.repository";
import { CommentLikeService } from "./modules/comment-like/commentLike.service";
import { makeCommentLikeRoute } from "./routes/comment-like.routes";
import { makeBookmarkRoute } from "./routes/bookmark.route";
import { BookmarkRepository } from "./modules/bookmark/bookmark.repository";
import { BookmarkService } from "./modules/bookmark/bookmark.service";
import { makeFollowRoute } from "./routes/follow.route";
import { makeImageRoute } from "./routes/image.route";
import { ShowImageRepository } from "./modules/show-image/show-image.repository";
import { ShowImageService } from "./modules/show-image/show-image.service";
import { makeHomePageRoute } from "./routes/homepage.route";
import { HomepageService } from "./modules/homepage/homepage.service";
import { CloseFriendsRepository } from "./modules/closefriends/closeFriends.repository";
import { CloseFriendsService } from "./modules/closefriends/closeFriends.service";
import { makeCloseFriendsRoute } from "./routes/closeFriends.route";
import { NotificationRepository } from "./modules/notification/notification.repository";
import { NotificationService } from "./modules/notification/notification.service";
import { makeNotificationRoute } from "./routes/notification.route";
import { CollegegramiesService } from "./modules/collegegramies/collegegramies.service";
import { makeCollegegramiesRoute } from "./routes/collegegramies.route";

export const makeApp = (AppDataSource: DataSource) => {
  const app = express();
  const cors = require("cors");

  const userRepo = new UserRepository(AppDataSource);
  const followRepo = new FollowRepository(AppDataSource);
  const blockUserRepo = new BlockUserRepository(AppDataSource);
  const postRepo = new PostRepository(AppDataSource);

  const userService = new UserService(
    userRepo,
    followRepo,
    blockUserRepo,
    postRepo
  );
  const userForgetPasswordRepo = new UserForgetPasswordRepository(
    AppDataSource
  );
  const userForgetPasswordService = new UserForgetPasswordService(
    userForgetPasswordRepo,
    userService
  );

  const blockUserService = new BlockUserService(
    blockUserRepo,
    userService,
    followRepo
  );

  const followService = new FollowService(followRepo, userRepo, blockUserRepo);

  const postLikeRepo = new PostLikeRepository(AppDataSource);
  const postLikeService = new PostLikeService(postLikeRepo);
  const tagRepo = new TagRepository(AppDataSource);

  const postImageRepo = new PostImageRepository(AppDataSource);
  const bookmarkRepo = new BookmarkRepository(AppDataSource);
  const tagService = new TagService(
    tagRepo,
    userRepo,
    blockUserRepo,
    followRepo,
    postLikeRepo,
    bookmarkRepo
  );

  const postService = new PostService(
    postRepo,
    userRepo,
    tagRepo,
    postImageRepo,
    postLikeRepo,
    bookmarkRepo
  );
  const bookmarkService = new BookmarkService(bookmarkRepo, postService);
  const commentRepo = new CommentRepository(AppDataSource);

  const commentLikeRepo = new CommentLikeRepository(AppDataSource);
  const commentLikeService = new CommentLikeService(
    commentLikeRepo,
    commentRepo,
    userRepo
  );

  const commentService = new CommentService(
    commentRepo,
    postRepo,
    userRepo,
    commentLikeRepo
  );

  const showImageRepo = new ShowImageRepository(AppDataSource);
  const showImageService = new ShowImageService(showImageRepo);

  const closeFriendsRepo = new CloseFriendsRepository(AppDataSource);
  const closeFriendsService = new CloseFriendsService(
    closeFriendsRepo,
    userService
  );

  const homepageService = new HomepageService(
    postService,
    followService,
    blockUserService,
    postLikeRepo,
    bookmarkRepo
  );

  const collegegramiesService = new CollegegramiesService(
    postService,
    followService,
    blockUserService,
    userService
  );

  const notificationRepo = new NotificationRepository(AppDataSource);
  const notificationService = new NotificationService(
    notificationRepo,
    userRepo,
    postRepo,
    commentRepo,
    followRepo
  );

  const corsOptions = {
    origin: "*", // Replace with the origin of your frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Authorization", "Content-Type"],
    exposedHeaders: "Authorization",
  };

  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    makeUserRoute(userService, userForgetPasswordService, blockUserService)
  );
  app.use(makeBookmarkRoute(bookmarkService, userService));
  app.use(
    makePostRoute(
      postService,
      userService,
      postLikeService,
      tagService,
      blockUserService
    )
  );
  app.use(makeCommentRoute(commentService, userService));
  app.use(makeCommentLikeRoute(commentLikeService, userService));
  app.use(makeCloseFriendsRoute(closeFriendsService, userService));
  app.use(makeHomePageRoute(homepageService, userService));
  app.use(makeCollegegramiesRoute(collegegramiesService, userService));
  app.use(makeFollowRoute(followService, userService));
  app.use(makeImageRoute(showImageService, userService));
  app.use(makeNotificationRoute(notificationService, userService));
  app.use(finalErrorHandling);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.options("*", cors(corsOptions));

  // Middleware to set headers
  app.use((req: any, res: any, next: any) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Expose-Headers", "*");
    next();
  });

  return app;
};
