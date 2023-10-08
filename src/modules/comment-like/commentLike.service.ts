import { HttpResponseType } from "../../routes/utils/HTTPResponse";
import { BadRequestError } from "../../utility/errors";
import { CommentRepository } from "../comment/comment.repository";
import { UserRepository } from "../user/user.repository";
import { CommentLikeRepository, likeComment } from "./commentLike.repository";
import { LikeCommentDto } from "./dto/likeCommentDto";

export class CommentLikeService {
    constructor(private commentLikeRepo: CommentLikeRepository, private commentRepo: CommentRepository, private userRepo: UserRepository) {}

    public async likeComment(dto: LikeCommentDto): Promise<HttpResponseType>{
        const comment = await this.commentRepo.getCommentById(dto.commentId);
        if(!comment) throw new BadRequestError("comment does not exist");

        const user = await this.userRepo.getUserById(dto.userId);
        if(!user) throw new BadRequestError("user does not exist");

        const isCommentLiked = await this.commentLikeRepo.getCommentLikeByUserId(user.id, comment.id)
        if(isCommentLiked) throw new BadRequestError("comment already liked by this user");

        const toLikeComment: likeComment = {
            userId: dto.userId,
            commentId: dto.commentId
        }

        const likedComment = await this.commentLikeRepo.likeComment(toLikeComment);

        await this.commentRepo.increaseCommentLikeCount(comment.id)

    
        return {
            statusCode: 201,
            response: {
                message: "comment liked successfully",
                data: {
                    userId: likedComment.userId,
                    commentId: likedComment.commentId
                }
            }
        }
    }

    public async unlikeComment(dto: LikeCommentDto): Promise<HttpResponseType>{
        const comment = await this.commentRepo.getCommentById(dto.commentId);
        if(!comment) throw new BadRequestError("comment does not exist");

        const user = await this.userRepo.getUserById(dto.userId);
        if(!user) throw new BadRequestError("user does not exist");

        const isCommentAlreadyLiked = await this.commentLikeRepo.getCommentLikeByUserId(user.id, comment.id)
        if(!isCommentAlreadyLiked) throw new BadRequestError("comment is not liked by the user");

        const toUnLikeComment: likeComment = {
            userId: dto.userId,
            commentId: dto.commentId
        }

        const likedComment = await this.commentLikeRepo.unlikeComment(toUnLikeComment);

        await this.commentRepo.decreaseCommentLikeCount(comment.id)
    
        return {
            statusCode: 200,
            response: {
                message: "comment unliked successfully"
            }
        }
    }
}
