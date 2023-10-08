import {UserId} from "../types/userIdType";
import {BlockUserRepository} from "./blockUser.repository";
import {BadRequestError, NotFoundError} from "../../../utility/errors";
import {HttpResponseType} from "../../../routes/utils/HTTPResponse";
import {UserService} from "../user.service";
import {BlockUserDto} from "./dto/blockUserDto";
import { FollowRepository } from "../../follow/follow.repository";
import { BlockedUserEntity } from "./entity/blockedUser.entity";

export interface IBlockUserService {
    blockUser(dto:BlockUserDto): Promise<HttpResponseType>;
    unBlockUser(dto:BlockUserDto): Promise<HttpResponseType>;
    isUserBlocked(userId: UserId, blockUserId: UserId): Promise<boolean>;
}

export class BlockUserService implements IBlockUserService {
    constructor(private blockUserRepository: BlockUserRepository,private userService: UserService, private followRepository: FollowRepository) {
    }
    async blockUser(dto:BlockUserDto): Promise<HttpResponseType> {
        const blockUser = await this.userService.findUserByUsername(dto.blockUserName);
        if (!blockUser) throw new NotFoundError("User not found")

        if (dto.userId === blockUser.id) throw new BadRequestError("You can't block yourself")
        await this.blockUserRepository.blockUser(dto.userId, blockUser.id);

        const followStatusBlockedToUser = await this.followRepository.getFollowExists(blockUser.id, dto.userId)
        if(followStatusBlockedToUser){
            await this.followRepository.unfollow({
                userId: dto.userId,
                followedUserId: blockUser.id,
                state: followStatusBlockedToUser.state
            })
        }

        const followStatusUserToBlocked = await this.followRepository.getFollowExists(dto.userId, blockUser.id)
        if(followStatusUserToBlocked){
            await this.followRepository.unfollow({
                userId: blockUser.id,
                followedUserId: dto.userId,
                state: followStatusUserToBlocked.state
            })
        }
        
        

        return {
            statusCode: 200,
            response: {
                message: "user blocked successfully"
            }
        }
    }
    async unBlockUser(dto:BlockUserDto): Promise<HttpResponseType> {
        const blockUserId = await this.userService.findUserByUsername(dto.blockUserName);
        if (!blockUserId) throw new NotFoundError("User not found")

        if (dto.userId === blockUserId.id) throw new BadRequestError("You can't block yourself")
        await this.blockUserRepository.unBlockUser(dto.userId, blockUserId.id);

        return {
            statusCode: 200,
            response: {
                message: "user unblocked successfully"
            }
        }
    }
    isUserBlocked(userId: UserId, blockUserId: UserId): Promise<boolean> {
        return this.blockUserRepository.isUserBlocked(userId, blockUserId);
    }

    getBlockedUsers(loggedUserId: UserId) {
        return this.blockUserRepository.getBlockedUsers(loggedUserId)
    }
    
    blockedlist(userId: UserId): Promise<BlockedUserEntity[]>{
        return this.blockUserRepository.blokedUserList(userId);
    }
    blockedByList(userId: UserId): Promise<BlockedUserEntity[]>{
        return this.blockUserRepository.blockedlist(userId)
    }
}