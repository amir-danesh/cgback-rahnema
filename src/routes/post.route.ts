import { Router } from "express";
import { PostService } from "../modules/post/post.service";
import { UserService } from "../modules/user/user.service";
import { handleExpress } from "../utility/handleExperess";
import { loginMiddleware } from "../utility/login.middleware";
import { postsUpload, UploadedPostImage } from "../utility/postUpload";
import { createPostDto } from "../modules/post/dto/createPostDto";
import { TagService } from "../modules/post/tag/tag.service";
import { Tag, zodTag, zodTagArray } from "../modules/post/tag/model/tag";
import { BadRequestError } from "../utility/errors";
import { ZodPostId } from "../modules/post/model/post-id";
import { editPostDto } from "../modules/post/dto/editPostDto";
import { postLikeDto } from "../modules/post/postLike/dto/postLikeDto";
import { likeHandleExpress } from "../utility/likeHandleExpress";
import { PostLikeService } from "../modules/post/postLike/postLike.service";
import { zodUsername } from "../modules/user/types/usernameType";
import { BlockUserService } from "../modules/user/blockedUsers/blockUser.service";
import { UserId } from "../modules/user/types/userIdType";
import { User } from "../modules/user/model/user";
import { tagName } from "../modules/post/tag/model/tag-name";
import {isCloseFriend, IsCloseFriend, zodIsCloseFriend} from "../modules/post/type/isCloseFriend";
import {createHttpResponse} from "../utility/createHttpResponse";

const validateInputTags = (tagString: string): Tag[] => {
  // ASK HADI
  const tags = Array.from(new Set(tagString.trim().split(" ")));
  const validTagArray = zodTagArray.parse(tags);
  const tagsArray = validTagArray.map((tag: unknown) => zodTag.parse(tag));
  return tagsArray;
};

export const makePostRoute = (
  postService: PostService,
  userService: UserService,
  postLikeService: PostLikeService,
  tagService: TagService,
  blockUserService: BlockUserService
) => {
  const app = Router();

  app.post(
    "/api/post/create-post",
    loginMiddleware(userService),
    postsUpload.array("images", 10),
    (req, res) => {
      if (req.body.tags && req.body.tags.length > 0) {
        
        req.body.tags = validateInputTags(req.body.tags);
      }
      if (!req.files) throw new BadRequestError("request must not be empty");

      const uploadedFiles = req.files as UploadedPostImage[];
      const images = uploadedFiles.map(
        (file: UploadedPostImage) => file.filename
      );
      const isCloseFriend = req.body.isCloseFriend === 'true' ? true : false;
      if (req.body.tags.length == 0) {
        req.body.tags = [];
      }
      const repo = { ...req.body,
        isCloseFriend:isCloseFriend,
          userId: req.user.id, images };
      
     

      const dto = createPostDto.parse(repo);
      handleExpress(res, () => postService.createPost(dto));
    }
  );

  app.get(
    "/api/post/view-post/:postId",
    loginMiddleware(userService),
    (req, res) => {
      handleExpress(res, async () => {
        const postId = ZodPostId.parse(req.params.postId);
        const userPosted = await postService.getPostedUser(postId);
        await checkBlockedUser(req.user.id, userPosted);
        return postService.viewPost(postId, req.user.id);
      });
    }
  );

  app.put("/api/post/edit-post/", loginMiddleware(userService), (req, res) => {
    if (req.body.tags && req.body.tags.length > 0) {
      req.body.tags = validateInputTags(req.body.tags);
    }
    if (req.body.tags.length == 0) {
      req.body.tags = [];
    }
    const dto = editPostDto.parse(req.body);

    handleExpress(res, () => postService.editPost(dto));
  });

  app.post("/api/post/like", loginMiddleware(userService), (req, res) => {
    const dto = postLikeDto.parse({ ...req.body, userId: req.user.id });
    handleExpress(res, () =>
      likeHandleExpress(dto, postService, () => postLikeService.likePost(dto))
    );
  });
  app.delete("/api/post/unlike", loginMiddleware(userService), (req, res) => {
    const dto = postLikeDto.parse({ ...req.body, userId: req.user.id });
    handleExpress(res, () =>
      likeHandleExpress(dto, postService, () => postLikeService.unlikePost(dto))
    );
  });
  app.get("/api/post/isLiked/:postId", loginMiddleware(userService), (req, res) => {
    handleExpress(res, async () => {
      const postId = ZodPostId.parse(req.params.postId);
      const isLiked = await postLikeService.isUserLikedPost(postId, req.user.id);
      return createHttpResponse(req,isLiked,"is liked");
    });
  })
  app.get("/api/post/:username", loginMiddleware(userService), (req, res) => {
    handleExpress(res, async () => {
      const username = zodUsername.parse(req.params.username);
      const userPosted = await userService.findUserByUsername(username);
      await checkBlockedUser(req.user.id, userPosted);
      return postService.getAllpostwithUsername(username, req.user);
    });
  });

  app.get(
    "/api/post/search/:value",
    loginMiddleware(userService),
    (req, res) => {
      const value = tagName.Zod.parse(req.params.value);
      handleExpress(res, () => tagService.searchPostByTag(value, req.user.id));
    }
  );
  const checkBlockedUser = async (userId: UserId, checkUser: User | null) => {
    if (!checkUser) {
      throw new BadRequestError("user not found");
    }
    if (await blockUserService.isUserBlocked(checkUser.id, userId)) {
      throw new BadRequestError("you are blocked by this user");
    }
  };
  return app;
};
