import { DataSource, Repository } from "typeorm";
import { CommentEntity } from "./entity/comment.entity";
import { CommentId } from "./types/commenIdType";
import { CommentText } from "./types/commentTextType";
import { UserEntity } from "../user/entity/user.entity";
import { PostEntity } from "../post/entity/post.entity";
import { BadRequestError, NotFoundError } from "../../utility/errors";
import {
  incrementCommentLikeCount,
  decrementCommentLikeCount,
} from "./types/commentNumberOfLikesType";
import { id } from "../../type/id";
import { CommentNotificationEntity } from "../notification/entity/notificationComment.entity";
import { UserId } from "../user/types/userIdType";
import { Firstname } from "../user/types/firstnameType";
import { Lastname } from "../user/types/lastnameType";
import { Username } from "../user/types/usernameType";
import { PostId } from "../post/model/post-id";

export interface createComment {
  text: CommentText;
  createdBy: UserEntity;
  post: PostEntity;
  parent: CommentEntity | undefined;
}

interface notificationDetailComment {
  userId: UserId;
  firstName: Firstname;
  lastName: Lastname;
  username: Username;
  postId: PostId;
}

export class CommentRepository {
  private commentRepo: Repository<CommentEntity>;

  constructor(private AppDataSource: DataSource) {
    this.commentRepo = AppDataSource.getRepository(CommentEntity);
  }

  async getCommentById(id: CommentId): Promise<CommentEntity | undefined> {
    const comment = await this.commentRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        parent: true,
        post: true,
      },
    });

    return comment !== null ? comment : undefined;
  }

  async getCommentOwnerIdById(id: CommentId): Promise<notificationDetailComment | undefined> {
    const comment = await this.commentRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        createdBy: true,
        post: true
      },
    });

    if(!comment) throw new NotFoundError("comment not found")
    const { firstName, lastName, username } = comment?.createdBy
    const userId =  comment.createdBy.id
    const postId = comment.post.id

    return {
      userId,
      firstName,
      lastName,
      username,
      postId
    };
  }

  async getAllCommentsByPost(post: PostEntity): Promise<CommentEntity[]> {
    const comments = await this.commentRepo.find({
      where: {
        post: post,
      },
      relations: {
        parent: true,
        post: true,
      },
    });

    return comments;
  }

  async createComment(comment: createComment): Promise<CommentId> {
    const id = await this.AppDataSource.manager.transaction(async (manager) => {
      const postRepo = manager.getRepository(PostEntity);
      const commentRepo = manager.getRepository(CommentEntity);
      const commentNotificationRepo = manager.getRepository(CommentNotificationEntity)

      await postRepo.update(
        { id: comment.post.id },
        { commentCount: () => "commentCount + 1" }
      );
      const createdComment = await commentRepo.save(comment);
      const { id } = createdComment;

      await commentNotificationRepo.save({
        sourceUserId: comment.post.userId,
        targetUserId: comment.createdBy.id,
        commentId: createdComment.id
      })

      return id;
    });
    return id;
  }

  async increaseCommentLikeCount(commentId: CommentId): Promise<boolean> {
    const comment = await this.getCommentById(commentId);
    if (!comment) {
      throw new BadRequestError("Comment not found");
    }
    comment.likeCount = incrementCommentLikeCount(comment.likeCount);

    await this.commentRepo.save(comment);

    return true;
  }

  async decreaseCommentLikeCount(commentId: CommentId): Promise<boolean> {
    const comment = await this.getCommentById(commentId);
    if (!comment) {
      throw new BadRequestError("Comment not found");
    }
    comment.likeCount = decrementCommentLikeCount(comment.likeCount);

    await this.commentRepo.save(comment);

    return true;
  }
}
