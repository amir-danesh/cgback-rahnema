import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";
import { PostId } from "../model/post-id";
import { PostImageEntity } from "../postImage/entity/postImage.entity";
import { LikeCount } from "../model/likeCount";
import { TagEntity } from "../tag/entity/tag.entity";
import { UserId } from "../../user/types/userIdType";
import { Body } from "../type/body";
import { PostLikeEntity } from "../postLike/entity/postLike.entity";
import { CommentEntity } from "../../comment/entity/comment.entity";
import {BookmarkCount} from "../../bookmark/model/bookmarkCount";
import { CommentCount } from "../../comment/types/commentCount";
import { PostLikeNotificationEntity } from "../../notification/entity/notificationPostLike.entity";
import { IsCloseFriend } from "../type/isCloseFriend";

@Entity("posts")
export class PostEntity {
  @PrimaryGeneratedColumn()
  id!: PostId;

  @Column({ nullable: true })
  body!: Body;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user!: UserEntity;

  @Column()
  userId!: UserId;

  @OneToMany(() => PostImageEntity, (image) => image.post, { cascade: true, eager: true })
  @JoinColumn()
  images!: PostImageEntity[];

  @Column({ default: 0 })
  likeCount!: LikeCount;
  @Column({ default: 0 })
  bookmarkCount!: BookmarkCount;

  @Column({ default: 0 })
  commentCount!: CommentCount;

  @OneToMany(() => PostLikeEntity, (like) => like.post)
  @JoinColumn()
  likes!: PostLikeEntity[];

  @ManyToMany(() => TagEntity, (tag) => tag.posts, { cascade: true })
  @JoinTable()
  tags!: TagEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments!: CommentEntity[];

  @OneToOne(() => PostLikeNotificationEntity, (notification) => notification.post)
  postLikeNotifications!: PostLikeNotificationEntity[];

  @Column({ default: false })
  isCloseFriend!: IsCloseFriend;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
