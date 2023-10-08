import { CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { UserId } from "../../user/types/userIdType";
import { UserEntity } from "../../user/entity/user.entity";
import { CommentId } from "../../comment/types/commenIdType";
import { CommentEntity } from "../../comment/entity/comment.entity";

@Entity("comment-notification")
export class CommentNotificationEntity {
    @PrimaryColumn()
    sourceUserId!: UserId;

    @PrimaryColumn()
    targetUserId!: UserId;

    @PrimaryColumn()
    commentId!: CommentId;

    @ManyToOne(() => UserEntity, (user) => user.id)
    sourceUser!: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.id)
    targetUser!: UserEntity;

    @OneToOne(() => CommentEntity, (comment) => comment.id)
    comment!: CommentEntity;

    @CreateDateColumn()
    createdAt!: Date;
}