import {DataSource, DeleteResult, Repository} from "typeorm";
import {BlockedUserEntity} from "./entity/blockedUser.entity";
import {UserId} from "../types/userIdType";
import {UserDaoWithIdAndEmailAndFollowCount as UserDaoList} from "../dao/userDao"
export class BlockUserRepository{
    private blockUserRepo: Repository<BlockedUserEntity>;
    constructor(AppDataSource: DataSource) {
        this.blockUserRepo = AppDataSource.getRepository(BlockedUserEntity);
    }
    public async blockUser(userId: UserId, blockUserId: UserId): Promise<BlockedUserEntity>{
        return await this.blockUserRepo.save({
            user_id: userId,
            blockUser_id: blockUserId
        })
    }
    public async unBlockUser(userId: UserId, blockUserId: UserId): Promise<DeleteResult>{
        return await this.blockUserRepo.delete({
            user_id: userId,
            blockUser_id: blockUserId
        });
    }
    public async isUserBlocked(userId: UserId, blockUserId: UserId): Promise<boolean>{
        const isUserBlocked = await this.blockUserRepo.findOneBy({
            user_id: userId,
            blockUser_id: blockUserId
        });
        return !!isUserBlocked;
    }

    async getBlockedUsers(loggedUserId: UserId) {
        const result= await this.blockUserRepo.find({
            where: {
                user_id: loggedUserId
            },

            relations:{
                blockedUser: true
            }

        })
        return result.map(this.transformToUserDao)
    }
    private transformToUserDao(blockUser: BlockedUserEntity): UserDaoList {
        return {
            id: blockUser.blockedUser.id,
            email: blockUser.blockedUser.email,
            firstName: blockUser.blockedUser.firstName,
            lastName: blockUser.blockedUser.lastName,
            bio: blockUser.blockedUser.bio,
            username: blockUser.blockedUser.username,
            profilePicture: blockUser.blockedUser.profilePicture,
            followersCount: blockUser.blockedUser.followerCount,
            followingCount: blockUser.blockedUser.followingCount,
        }
    }

    public async blokedUserList(userId: UserId): Promise<BlockedUserEntity[]>{
        return await this.blockUserRepo.find({
            where : {blockUser_id:userId}
        })
    }
    public async blockedlist(userId: UserId): Promise<BlockedUserEntity[]>{
        return await this.blockUserRepo.find({
            where : {user_id:userId}
        })
    }
}