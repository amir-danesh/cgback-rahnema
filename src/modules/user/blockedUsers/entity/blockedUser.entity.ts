import {CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {UserEntity} from "../../entity/user.entity";
import {UserId} from "../../types/userIdType";

@Entity("blocked_users")
export class BlockedUserEntity {
    @PrimaryColumn()
    user_id!: UserId;

    @PrimaryColumn()
    blockUser_id!: UserId;

    @ManyToOne(() => UserEntity, {cascade: true})
    @JoinColumn({name: "user_id"})
    user!: UserEntity;

    @ManyToOne(() => UserEntity, {cascade: true})
    @JoinColumn({name: "blockUser_id"})
    blockedUser!: UserEntity;
    
    @CreateDateColumn()
    createAt!: Date;
}