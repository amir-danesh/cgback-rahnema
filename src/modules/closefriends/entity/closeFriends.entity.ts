import {CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {UserId} from "../../user/types/userIdType";
import {UserEntity} from "../../user/entity/user.entity";

@Entity("close_friends")
export class CloseFriendsEntity {
    @PrimaryColumn()
    user_id!: UserId;
    @PrimaryColumn()
    close_friend_id!: UserId;
    @ManyToOne(() => UserEntity, {cascade: true})
    @JoinColumn({name: "user_id"})
    user!: UserEntity;
    @ManyToOne(() => UserEntity, {cascade: true})
    @JoinColumn({name: "close_friend_id"})
    closeFriend!: UserEntity;

    @CreateDateColumn()
    createAt!: Date;
}