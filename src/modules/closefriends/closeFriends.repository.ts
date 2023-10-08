import {DataSource, Repository} from "typeorm";
import {CloseFriendsEntity} from "./entity/closeFriends.entity";
import {UserId} from "../user/types/userIdType";
import {CloseFriendsCount} from "./type/closeFriendsCount";
import {UserDaoWithIdAndEmailAndFollowCount as UserDaoList} from "../user/dao/userDao";

export interface ICloseFriendsRepository {
    addCloseFriend(userId: UserId, closeFriendId: UserId): Promise<CloseFriendsCount>

    removeCloseFriend(userId: UserId, closeFriendId: UserId): Promise<CloseFriendsCount>

    getAllCloseFriends(userId: UserId): Promise<UserDaoList[]>

}
export class CloseFriendsRepository implements ICloseFriendsRepository {
    private closeFriendsRep: Repository<CloseFriendsEntity>;

    constructor(private AppDataSource: DataSource) {
        this.closeFriendsRep = AppDataSource.getRepository(CloseFriendsEntity)
    }

    async addCloseFriend(userId: UserId, closeFriendId: UserId): Promise<CloseFriendsCount> {
        const result=   this.closeFriendsRep.create({user_id: userId, close_friend_id: closeFriendId})
        await this.closeFriendsRep.save(result)
        return await this.closeFriendsRep.count({where: {user_id: userId}}) as CloseFriendsCount
    }

    async removeCloseFriend(userId: UserId, closeFriendId: UserId): Promise<CloseFriendsCount> {
       await this.closeFriendsRep.delete({user_id: userId, close_friend_id: closeFriendId})
        return await this.closeFriendsRep.count({where: {user_id: userId}}) as CloseFriendsCount
    }

    async getAllCloseFriends(loggedInUser: UserId): Promise<UserDaoList[]> {
        const closeFriends =await this.closeFriendsRep.find({
            where: {user_id: loggedInUser}
            , relations: {
                closeFriend: true
            }
        })
        return closeFriends.map(this.transformToUserDao);
    }

    private isCloseFriendEntityExists(closeFriend: CloseFriendsEntity | null): boolean {
        return !!closeFriend;
    }

    async isInAllowedCloseFriendList(loggedInUser: UserId, closeFriendId: UserId) {
        const closeFriend = await this.closeFriendsRep.findOne({
            where: {
                user_id: loggedInUser,
                close_friend_id: closeFriendId,
            }
        })
        return this.isCloseFriendEntityExists(closeFriend);
    }
    private transformToUserDao(closeFriend: CloseFriendsEntity): UserDaoList {
        return {
            id: closeFriend.closeFriend.id,
            email: closeFriend.closeFriend.email,
            firstName: closeFriend.closeFriend.firstName,
            lastName: closeFriend.closeFriend.lastName,
            bio: closeFriend.closeFriend.bio,
            username: closeFriend.closeFriend.username,
            profilePicture: closeFriend.closeFriend.profilePicture,
            followersCount: closeFriend.closeFriend.followerCount,
            followingCount: closeFriend.closeFriend.followingCount
        }
    }
}
