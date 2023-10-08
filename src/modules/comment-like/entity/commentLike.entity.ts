import {
    Entity,
    PrimaryColumn,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { UserEntity } from '../../user/entity/user.entity';
  import { CommentEntity } from '../../comment/entity/comment.entity';
import { UserId } from '../../user/types/userIdType';
import { CommentId } from '../../comment/types/commenIdType';
  
  @Entity('comment_likes')
  export class CommentLikeEntity {
    @PrimaryColumn()
    userId!: UserId;
  
    @PrimaryColumn()
    commentId!: CommentId;
  
    @ManyToOne(() => UserEntity, (user) => user.commentLikes)
    user!: UserEntity;
  
    @ManyToOne(() => CommentEntity, (comment) => comment.likes)
    comment!: CommentEntity;
  
    @CreateDateColumn()
    timestamp!: Date;
  }