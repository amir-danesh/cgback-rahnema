import { HttpResponseType } from "../../routes/utils/HTTPResponse";
import { BadRequestError } from "../../utility/errors";
import { PostId } from "../post/model/post-id";
import { PostRepository } from "../post/post.repository";
import { UserRepository } from "../user/user.repository";
import { CommentRepository, createComment } from "./comment.repository";
import { CommentId } from "./types/commenIdType";
import { CreateCommentWithUserIdDto } from "./dto/createCommentDto";
import { UserId } from "../user/types/userIdType";
import { CommentWithChildren } from "./utils/getNestedComment";
import { CommentLikeRepository } from "../comment-like/commentLike.repository";

export class CommentService {
    constructor(private commentRepo: CommentRepository, private postRepo: PostRepository, private userRepo: UserRepository, private commentLikeRepo: CommentLikeRepository) {}

    public async createComment(dto: CreateCommentWithUserIdDto): Promise<HttpResponseType> {
        const post = await this.postRepo.getPostById(dto.postId);
        if(!post) throw new BadRequestError("Post does not exist");

        const user = await this.userRepo.getFullUserById(dto.userId);
        if(!user) throw new BadRequestError("User does not exist");

        const parentComment = dto.parentCommentId ? await this.commentRepo.getCommentById(dto.parentCommentId) : undefined

        if(dto.parentCommentId && !parentComment) throw new BadRequestError("Parent comment does not exist");

        const toCreateComment: createComment = {
            text: dto.text,
            createdBy: user,
            post: post,
            parent: parentComment
        }

        const createdCommentId = await this.commentRepo.createComment(toCreateComment);        

        return {
            statusCode: 201,
            response: {
                message: "Comment created successfully",
                data: {"id": createdCommentId}
            },
        };
    }

    public async getSingleComment(id: CommentId): Promise<HttpResponseType> {
        const comment = await this.commentRepo.getCommentById(id);
        if(!comment) throw new BadRequestError("Comment does not exist");

        return {
            statusCode: 200,
            response: {
                message: "Comment fetched successfully",
                data: comment
            },
        };
    }

    public async getCommentsForPost(id: PostId, userId: UserId): Promise<HttpResponseType> {
        const post = await this.postRepo.getCommentsForPostById(id)        
        if(!post) throw new BadRequestError("Post does not exist");
        
        const comments = await this.postRepo.getCommentsByPostIdNested(id)        

        const commentsWithCheckCurrentUserLiked = await this.addIfLoggedInUserLikedComment(userId, comments)

        return {
            statusCode: 200,
            response: {
                message: `Comments fetched successfully${comments?.length === 0 ? ". No comments for this post" : ""}`,
                data: commentsWithCheckCurrentUserLiked
            },
        };
    }

    private addIfLoggedInUserLikedComment = async ( userId: UserId, nestedComments: CommentWithChildren[] | null) => {
        if(!nestedComments) return null

        const newNestedComments: CommentWithChildren[] = []

        for(const comment of nestedComments){
            const isCommentLiked = await this.commentLikeRepo.getCommentLikeByUserId(userId, comment.id) !== null ? true : false

            const newComment = {...comment, isCommentLiked: isCommentLiked}

            if(newComment.children && newComment.children.length > 0){
                for(let i=0; i<newComment.children.length; i++){
                    const isNestedCommentLiked = await this.commentLikeRepo.getCommentLikeByUserId(userId, newComment.children[i].id) !== null ? true : false
                    newComment.children[i] = {...newComment.children[i], isCommentLiked: isNestedCommentLiked}
                }
            }

            newNestedComments.push(newComment)
        }

        return newNestedComments
    }
}
