import { CreatePostDto } from "./dto/createPostDto";
import { PostId } from "./model/post-id";
import { PostRepository } from "./post.repository";
import { TagRepository } from "./tag/tag.repository";
import { PostImageRepository } from "./postImage/postImage.repository";
import { BadRequestError, ServerInternalError } from "../../utility/errors";
import { UserRepository } from "../user/user.repository";
import { EditPostDto } from "./dto/editPostDto";
import { Username } from "../user/types/usernameType";
import { User } from "../user/model/user";
import { isPostImageUrl } from "./postImage/model/postImageCreatePost";
import { UserId } from "../user/types/userIdType";
import { PostLikeRepository } from "./postLike/postLike.repository";
import { BookmarkRepository } from "../bookmark/bookmark.repository";
import {isCloseFriend} from "./type/isCloseFriend";

export interface IPostService {
  isPostExist(postId: PostId): Promise<boolean>;
  getPostedUser(postId: PostId): Promise<User>;
}

export class PostService {
  constructor(
    private postRepo: PostRepository,
    private userRepo: UserRepository,
    private tagRepo: TagRepository,
    private postImageRepo: PostImageRepository,
    private postLikeRepo: PostLikeRepository,
    private bookmarkRepo: BookmarkRepository
  ) {}

  async createPost(postDetail: CreatePostDto) {
    const { userId, body, images, tags,isCloseFriend } = postDetail;

    const post = await this.postRepo.createPost({
      userId,
      body: body,
      isCloseFriend:isCloseFriend
    });

    await this.postImageRepo.addImages(images, post.id);

    await this.tagRepo.addTags(tags, post);

    const createdPost = await this.postRepo.getPostById(post.id);
    return {
      statusCode: 201,
      response: {
        message: "post created successfully",
        data: createdPost,
      },
    };
  }

  async viewPost(postId: PostId, userId: UserId) {
    const post = await this.postRepo.getPostById(postId);
    if (!post) throw new BadRequestError("post not found");

    return {
      statusCode: 200,
      response: {
        message: "success",
        data: {
          ...post,
          isliked: await this.postLikeRepo.isUserLikedPost(post.id, userId),
          isBookmarked: await this.bookmarkRepo.isPostBookmarked(
            post.id,
            userId
          ),
        },
      },
    };
  }

  async editPost(dto: EditPostDto) {
    const { postId, body, tags,isCloseFriend } = dto;

    const editedPost = await this.postRepo.editPostById(postId, body,isCloseFriend);
    if (!editedPost) throw new BadRequestError("post does not exist");

    await this.tagRepo.editTags(tags, postId);

    const post = await this.postRepo.getPostById(postId);

    return {
      statusCode: 200,
      response: {
        message: "post edited successfully",
        data: post,
      },
    };
  }

  getPostById(postId: PostId) {
    return this.postRepo.getPostById(postId);
  }
  async getAllpostwithUsername(username: Username, user: User) {
    const userRow = await this.userRepo.findByUserNameWithRelations(username);
    if (!userRow) {
      throw new BadRequestError("user not found");
    }
    if (user.isPrivate && user.username !== userRow.username) {
      throw new BadRequestError("user is private");
    }

    return {
      statusCode: 200,
      response: {
        message: "get posts successfully",
        data: userRow,
      },
    };
  }
  isPostExist(postId: PostId): Promise<boolean> {
    return this.postRepo.isPostExist(postId);
  }
  async getPostedUser(postId: PostId): Promise<User> {
    return await this.postRepo.getPostedUser(postId);
  }

  async getPostsByUserId(userId: UserId) {
    return await this.postRepo.getPostsByUserId(userId);
  }
  async getPostsForCollegegramies(userId: UserId) {
    return await this.postRepo.getPostsForCollegegramies(userId);
  }
  async getpostsCount(userId: UserId): Promise<number> {
    return await this.postRepo.postsCount(userId);
  }
}
