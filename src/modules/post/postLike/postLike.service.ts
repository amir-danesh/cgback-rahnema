import {PostLikeDto} from "./dto/postLikeDto";
import {PostLikeRepository} from "./postLike.repository";
import {LikeCount} from "../model/likeCount";
import {HttpResponseType} from "../../../routes/utils/HTTPResponse";
import {DataNotFound} from "../../../utility/errors";
import {PostId} from "../model/post-id";
import {UserId} from "../../user/types/userIdType";


export interface IPostLikeService{
    likePost(dto: PostLikeDto):Promise<HttpResponseType>
    unlikePost(dto: PostLikeDto):Promise<HttpResponseType>
}
export class PostLikeService implements IPostLikeService{
    constructor(private postLikeRepository: PostLikeRepository){
    }

    async likePost(dto: PostLikeDto):Promise<HttpResponseType> {
        let likeCount: LikeCount
        if (!await this.isUserLikedPost(dto.postId, dto.userId)){
            likeCount= await this.postLikeRepository.likePost(dto.postId, dto.userId)
        }else{
            throw new DataNotFound("user already liked this post")
        }
        return {
            statusCode: 200,
            response: {
                message: "liked successfully",
                data:{
                    likeCount: likeCount
                }
            }
        };
    }
    async unlikePost(dto: PostLikeDto): Promise<HttpResponseType> {
        let likeCount: LikeCount
        if (await this.isUserLikedPost(dto.postId, dto.userId)){
            likeCount= await this.postLikeRepository.unlikePost(dto.postId, dto.userId)
        }else{
            throw new DataNotFound("user not liked this post, so can't unlike this")
        }
        if (likeCount<0){
            throw new DataNotFound("like count is negative")
        }
        return {
            statusCode: 200,
            response: {
                message: "unlike successfully",
                data:{
                    likeCount: likeCount
                }
            }
        };
    }
    public isUserLikedPost(postId: PostId, userId: UserId): Promise<boolean> {
        return this.postLikeRepository.isUserLikedPost(postId, userId)
    }
}