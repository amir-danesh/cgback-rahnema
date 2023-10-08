import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  PrimaryColumn,
} from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";
import { UserId } from "../../user/types/userIdType";

export enum FollowStatus {
  PENDING = "pending",
  FOLLOWED = "followed",
}

@Entity("follow_list")
export class FollowEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user!: UserEntity;

  @PrimaryColumn()
  userId!: UserId;

  @PrimaryColumn()
  followedUserId!: UserId;

  @Column({
    type: "enum",
    enum: FollowStatus,
    default: FollowStatus.PENDING,
  })
  state!: FollowStatus;

  @CreateDateColumn()
  createdAt!: Date;
}
