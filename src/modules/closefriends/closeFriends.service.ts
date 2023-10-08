import {CloseFriendsRepository} from "./closeFriends.repository";
import {UserId} from "../user/types/userIdType";
import {UserService} from "../user/user.service";
import {CloseFriendsCount} from "./type/closeFriendsCount";
import {DuplicateValue, NotFoundError} from "../../utility/errors";
import {UserDaoWithIdAndEmailAndFollowCount} from "../user/dao/userDao";

export interface ICloseFriendsService {
    setCloseFriend(userId: UserId, closeFriendId: UserId): Promise<CloseFriendsCount>

    removeCloseFriend(userId: UserId, closeFriendId: UserId): Promise<CloseFriendsCount>

    getAllCloseFriends(userId: UserId): Promise<UserDaoWithIdAndEmailAndFollowCount[]>

}

export class CloseFriendsService implements ICloseFriendsService {
    constructor(
        private closeFriendsRepository: CloseFriendsRepository,
        private userService: UserService
    ) {
    }

    async setCloseFriend(loggedInUser: UserId, closeFriendId: UserId): Promise<CloseFriendsCount> {
        await this.checkIsUserExist(closeFriendId)
        if (loggedInUser === closeFriendId) throw new DuplicateValue("Cannot add yourself as close friend")
        if (await this.isCloseFriend(loggedInUser, closeFriendId)) throw new DuplicateValue("Already close friend")
        return await this.closeFriendsRepository.addCloseFriend(loggedInUser, closeFriendId)
    }

    async removeCloseFriend(loggedInUser: UserId, closeFriendId: UserId): Promise<CloseFriendsCount> {
        await this.checkIsUserExist(closeFriendId)
        if (!await this.isCloseFriend(loggedInUser, closeFriendId)) throw new NotFoundError("Not close friend")
        return await this.closeFriendsRepository.removeCloseFriend(loggedInUser, closeFriendId)
    }

    async getAllCloseFriends(loggedInUser: UserId): Promise<UserDaoWithIdAndEmailAndFollowCount[]> {
        return await this.closeFriendsRepository.getAllCloseFriends(loggedInUser)
    }
    async isCloseFriend(loggedInUser: UserId, closeFriendId: UserId): Promise<boolean> {
        await this.checkIsUserExist(closeFriendId)
        return await this.closeFriendsRepository.isInAllowedCloseFriendList(loggedInUser, closeFriendId)
    }
    async checkIsUserExist(userId: UserId){
        const user= await this.userService.isUserIdExist(userId)
        if (!user) throw new NotFoundError("User not found")
    }
}