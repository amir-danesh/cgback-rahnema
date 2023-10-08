import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { CommentLikeEntity } from "../../comment-like/entity/commentLike.entity";
import { UserId } from "../types/userIdType";
import { Username } from "../types/usernameType";
import { Password } from "../types/passwordType";
import { PostLikeEntity } from "../../post/postLike/entity/postLike.entity";
import { BlockedUserEntity } from "../blockedUsers/entity/blockedUser.entity";
import { FollowEntity } from "../../follow/entity/follow.entity";
import { FollowerCount } from "../../follow/type/follower.type";
import { FollowingCount } from "../../follow/type/following.type";
import { Email } from "../types/emailType";
import { Firstname } from "../types/firstnameType";
import { Lastname } from "../types/lastnameType";
import { Bio } from "../types/bioType";
import { PrivatePage } from "../types/isPrivateType";
import { PostEntity } from "../../post/entity/post.entity";
import { FollowStateNotificationEntity } from "../../notification/entity/notificationUser.entity";
import { CommentNotificationEntity } from "../../notification/entity/notificationComment.entity";
import { PostLikeNotificationEntity } from "../../notification/entity/notificationPostLike.entity";
import {LikeCount} from "../../post/model/likeCount";
import {CloseFriendsCount} from "../../closefriends/type/closeFriendsCount";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: UserId;

  @Column({ unique: true })
  username!: Username;

  @Column({ unique: true })
  email!: Email;

  @Column()
  password!: Password;

  @Column({ nullable: true })
  firstName!: Firstname;

  @Column({ nullable: true })
  lastName!: Lastname;

  @Column({ default: true })
  isPrivate!: PrivatePage;

  @Column({ default: false })
  status!: boolean;

  @Column({ nullable: true })
  profilePicture!: string;

  @Column({ nullable: true })
  bio!: Bio;

  @OneToMany(() => PostLikeEntity, (like) => like.user)
  @JoinColumn()
  postLikes!: PostLikeEntity[];

  @OneToMany(() => BlockedUserEntity, (blockedUser) => blockedUser.user)
  blockedUser!: BlockedUserEntity[];

  @OneToMany(() => CommentLikeEntity, (like) => like.user)
  commentLikes!: CommentLikeEntity[];

  @OneToMany(() => FollowEntity, (follow) => follow.user)
  follow!: FollowEntity[];

  @OneToMany(() => FollowStateNotificationEntity, (user) => user.sourceUserId)
  userNotificationSourceUser!: FollowStateNotificationEntity[]

  @OneToMany(() => FollowStateNotificationEntity, (user) => user.targetUserId)
  userNotificationTargetUser!: FollowStateNotificationEntity[]

  @OneToMany(() => CommentNotificationEntity, (user) => user.sourceUserId)
  commentNotificationSourceUser!: CommentNotificationEntity[]

  @OneToMany(() => CommentNotificationEntity, (user) => user.targetUserId)
  commentNotificationTargetUser!: CommentNotificationEntity[]

  @OneToMany(() => PostLikeNotificationEntity, (user) => user.sourceUserId)
  postLikeNotificationSourceUser!: PostLikeNotificationEntity[]

  @OneToMany(() => PostLikeNotificationEntity, (user) => user.targetUserId)
  postLikeNotificationTargetUser!: PostLikeNotificationEntity[]

  @Column({ default: 0 })
  followerCount!: FollowerCount;

  @Column({ default: 0 })
  followingCount!: FollowingCount;

  @OneToMany(() => PostEntity, (post) => post.user)
  @JoinColumn()
  posts!: PostEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
