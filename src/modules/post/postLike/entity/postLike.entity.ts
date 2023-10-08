import {CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import {PostId} from "../../model/post-id";
import {UserId} from "../../../user/types/userIdType";
import {UserEntity} from "../../../user/entity/user.entity";
import {PostEntity} from "../../entity/post.entity";

@Entity("post_likes")
export class PostLikeEntity {
    @PrimaryColumn()
    post_id!: PostId;
    @PrimaryColumn()
    user_id!: UserId;
    @OneToOne(() => UserEntity, {cascade: true})
    @JoinColumn({name: "user_id"})
    user!: UserEntity;
    @OneToOne(() => PostEntity, {cascade: true})
    @JoinColumn({name: "post_id"})
    post!: PostEntity;

    @CreateDateColumn()
    createdAt!: Date;
}