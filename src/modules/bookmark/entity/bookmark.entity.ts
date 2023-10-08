import {CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {PostId} from "../../post/model/post-id";
import {UserId} from "../../user/types/userIdType";
import {UserEntity} from "../../user/entity/user.entity";
import {PostEntity} from "../../post/entity/post.entity";


@Entity("bookmark")
export class BookmarkEntity {
    @PrimaryColumn()
    post_id!: PostId;

    @PrimaryColumn()
    user_id!: UserId;

    @ManyToOne(() => UserEntity, {cascade: true})
    @JoinColumn({name: "user_id"})
    user!: UserEntity;

    @ManyToOne(() => PostEntity, {cascade: true})
    @JoinColumn({name: "post_id"})
    post!: PostEntity;
    
    @CreateDateColumn()
    createdAt!: Date;
}