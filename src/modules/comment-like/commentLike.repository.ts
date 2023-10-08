import { Repository, DataSource } from "typeorm";
import { CommentLikeEntity } from "./entity/commentLike.entity";
import { UserId } from "../user/types/userIdType";
import { CommentId } from "../comment/types/commenIdType";
import { BadRequestError } from "../../utility/errors";

export interface likeComment {
    userId: UserId;
    commentId: CommentId
}

export class CommentLikeRepository {
    private commentLikeRepo: Repository<CommentLikeEntity>;

    constructor(AppDataSource: DataSource) {
        this.commentLikeRepo = AppDataSource.getRepository(CommentLikeEntity);
    }

    public async getCommentLikeByUserId(userId: UserId, commentId: CommentId): Promise<CommentLikeEntity | null> {
        return await this.commentLikeRepo.findOne({
            where: {
                userId: userId,
                commentId: commentId
            }
        })
    }

    public async likeComment(like: likeComment): Promise<CommentLikeEntity>{
        return await this.commentLikeRepo.save(like)
    }

    public async unlikeComment(like: likeComment): Promise<CommentLikeEntity>{
        const likedComment = await this.getCommentLikeByUserId(like.userId, like.commentId)
        if (likedComment) return await this.commentLikeRepo.remove(likedComment)
        
        throw new BadRequestError("comment is not like by this user")
    }
    
}
