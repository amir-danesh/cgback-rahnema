import { DataSource, Repository } from "typeorm";
import { PostId } from "./model/post-id";
import { PostEntity } from "./entity/post.entity";
import { Tag } from "./tag/model/tag";
import { UserId } from "../user/types/userIdType";
import { Body } from "./type/body";
import { CommentEntity } from "../comment/entity/comment.entity";
import { BadRequestError, DataNotFound } from "../../utility/errors";
import {
  CommentWithChildren,
  removeParentAdditives,
  sortCommentsByDate,
  transformToNestedStructure,
  updateParentToRoot,
} from "../comment/utils/getNestedComment";
import { IsCloseFriend } from "./type/isCloseFriend";
import { User } from "../user/model/user";

export interface CreatePost {
  body: Body | undefined;
  userId: UserId;
  isCloseFriend: IsCloseFriend;
}

export interface UpdatePost {
  body: Body | undefined;
  postId: PostId;
  tags: Tag[];
}

export interface IPostRepository {
  createPost(post: CreatePost): Promise<PostEntity>;

  getPostById(id: PostId): Promise<PostEntity | null>;

  editPostById(
    id: PostId,
    body: Body,
    isCloseFriend: IsCloseFriend
  ): Promise<PostEntity | null>;
}

export class PostRepository implements IPostRepository {
  private postRepo: Repository<PostEntity>;

  constructor(private AppDataSource: DataSource) {
    this.postRepo = AppDataSource.getRepository(PostEntity);
  }

  createPost(post: CreatePost): Promise<PostEntity> {
    return this.postRepo.save(post);
  }

  async getPostById(id: PostId): Promise<PostEntity | null> {
    const post = await this.postRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        images: true,
        tags: true,
      },
    });
    return post;
  }

  async getCommentsForPostById(id: PostId): Promise<CommentEntity[] | null> {
    const post = await this.postRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        comments: {
          parent: true,
        },
      },
    });

    return post ? post.comments : null;
  }

  async getCommentsByPostIdNested(
    id: PostId
  ): Promise<CommentWithChildren[] | null> {
    const post = await this.postRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        comments: {
          parent: true,
          createdBy: true,
        },
      },
    });

    if (!post) throw new DataNotFound("Post not found");

    const sortedComments = sortCommentsByDate(post.comments);
    const removedAdditivesComments = removeParentAdditives(sortedComments);
    const updatedComments = removedAdditivesComments.map((comment) =>
      updateParentToRoot(comment, removedAdditivesComments)
    );
    const nestedComments = transformToNestedStructure(updatedComments);

    return nestedComments;
  }

  editPostById(
    id: PostId,
    body: Body | undefined,
    isCloseFriend: IsCloseFriend
  ): Promise<PostEntity | null> {
    return this.postRepo.save({ id, body, isCloseFriend });
  }

  async isPostExist(postId: PostId) {
    const post = await this.postRepo.findOneBy({ id: postId });
    return !!post;
  }

  async getPostedUser(postId: PostId): Promise<User> {
    const result = this.postRepo.findOne({
      where: {
        id: postId,
      },
      relations: {
        user: true,
      },
    });
    let post = await result;
    if (!post) throw new BadRequestError("post not found");
    return post.user;
  }

  async getPostsByUserId(userId: UserId) {
    return await this.postRepo.find({
      where: {
        userId: userId,
      },
      relations: {
        tags: true,
        images: true,
      },
    });
  }
  async getPostsForCollegegramies(userId: UserId) {
    return await this.postRepo.find({
      where: { userId: userId, isCloseFriend: false as IsCloseFriend },
      take: 4,
      relations: {
        images: true,
      },
    });
  }
  async postsCount(userId: UserId) {
    return await this.postRepo.count({ where: { userId } });
  }
}
