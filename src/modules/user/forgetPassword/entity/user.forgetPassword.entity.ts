import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../entity/user.entity";
import {UserId} from "../../types/userIdType";
import {Token} from "../../types/token";

@Entity("user_forget_password")
export class UserForgetPasswordEntity{
    @PrimaryGeneratedColumn()
    id!: number;
    @ManyToOne(() => UserEntity, userEntity => userEntity.id)
    userId!: UserId;
    @Column()
    token!: Token;
    @CreateDateColumn()
    expireAt!: Date;
}
