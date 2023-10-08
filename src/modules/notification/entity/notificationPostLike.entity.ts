import { CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { UserId } from "../../user/types/userIdType";
import { UserEntity } from "../../user/entity/user.entity";
import { PostId } from "../../post/model/post-id";
import { PostEntity } from "../../post/entity/post.entity";
  

@Entity("post-like-notification")
export class PostLikeNotificationEntity {
    @PrimaryColumn()
    sourceUserId!: UserId;

    @PrimaryColumn()
    targetUserId!: UserId;

    @PrimaryColumn()
    postId!: PostId;

    @ManyToOne(() => UserEntity, (user) => user.id)
    sourceUser!: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.id)
    targetUser!: UserEntity;

    @OneToOne(() =>PostEntity, (post) => post.id)
    post!: PostEntity;

    @CreateDateColumn()
    createdAt!: Date;
}