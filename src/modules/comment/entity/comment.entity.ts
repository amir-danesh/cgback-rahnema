import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    OneToMany,
    OneToOne
} from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";
import { PostEntity } from "../../post/entity/post.entity";
import { CommentId } from "../types/commenIdType";
import { CommentText } from "../types/commentTextType";
import { CommentLikeCount } from "../types/commentNumberOfLikesType";
import { CommentLikeEntity } from "../../comment-like/entity/commentLike.entity";
import { CommentNotificationEntity } from "../../notification/entity/notificationComment.entity";

@Entity("comments")
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id!: CommentId;

    @Column({ type: "varchar", length: 2200, nullable: false })
    text!: CommentText;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: "created_by" })
    createdBy!: UserEntity;

    @ManyToOne(() => PostEntity, (post) => post.comments)
    post!: PostEntity;

    @ManyToOne(() => CommentEntity, { nullable: true })
    @JoinColumn({ name: "parent_id" })
    parent?: CommentEntity;

    @OneToMany(() => CommentLikeEntity, (like) => like.comment)
    likes!: CommentLikeEntity[];

    @OneToOne(() => CommentNotificationEntity, (notification) => notification.comment)
    commentNotification!: CommentNotificationEntity;

    @Column({ type: "integer", nullable: false, default: 0 })
    likeCount!: CommentLikeCount;

    @CreateDateColumn()
    timestamp!: Date;
}