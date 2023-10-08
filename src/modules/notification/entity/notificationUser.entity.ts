import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { UserId } from "../../user/types/userIdType";
import { UserEntity } from "../../user/entity/user.entity";

export enum EFollowNotification {
    FOLLOWED = "followed",
    FOLLOW_REQUESTED = "follow-request",
    FOLLOW_ACCEPTED = "follow-accepted"
}
  

@Entity("follow-state-notification")
export class FollowStateNotificationEntity {
    @PrimaryColumn()
    sourceUserId!: UserId;

    @PrimaryColumn()
    targetUserId!: UserId;

    @ManyToOne(() => UserEntity, (user) => user.id)
    sourceUser!: UserEntity

    @ManyToOne(() => UserEntity, (user) => user.id)
    targetUser!: UserEntity

    @Column({
        type: "enum",
        enum: EFollowNotification
    })
    action!: EFollowNotification;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}