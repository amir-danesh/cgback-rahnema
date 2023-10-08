import {UserForgetPasswordEntity} from "./entity/user.forgetPassword.entity";
import {DataSource, Repository} from "typeorm";
import {UserId} from "../types/userIdType";
import {Token} from "../types/token";

export class UserForgetPasswordRepository{
    private userForgetPasswordRepo: Repository<UserForgetPasswordEntity>;
    constructor(AppDataSource: DataSource) {
        this.userForgetPasswordRepo = AppDataSource.getRepository(UserForgetPasswordEntity);
    }
    public async findByUserId(userId: UserId):Promise<UserForgetPasswordEntity | null> {
        return this.userForgetPasswordRepo.findOneBy({userId});
    }
    public async findByToken(token: Token):Promise<UserForgetPasswordEntity | null> {
        return this.userForgetPasswordRepo.findOneBy({token});
    }
    public async save(userId: UserId, token: Token):Promise<UserForgetPasswordEntity> {
        const userForgetPassword = new UserForgetPasswordEntity();
        userForgetPassword.userId = userId;
        userForgetPassword.token = token;
        return this.userForgetPasswordRepo.save(userForgetPassword);
    }


    async delete(id: number) {
        return this.userForgetPasswordRepo.delete(id)
    }
}
