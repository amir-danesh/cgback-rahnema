import { Router } from "express";
import { CommentService } from "../modules/comment/comment.service";
import { UserService } from "../modules/user/user.service";
import { loginMiddleware } from "../utility/login.middleware";
import { CreateCommentWithUserIdDto, createCommentDto } from "../modules/comment/dto/createCommentDto";
import { handleExpress } from "../utility/handleExperess";
import { UserId } from "../modules/user/types/userIdType";
import { ZodCommentId, isCommentId } from "../modules/comment/types/commenIdType";
import { ZodPostId } from "../modules/post/model/post-id";
import { ZodUserId } from "../modules/user/types/userIdType";

export const makeCommentRoute = (
    commentService: CommentService,
    userService: UserService
) => {
    const app = Router();

    app.post("/api/comment/create", loginMiddleware(userService), (req, res) => {
        const dtoWithoutUserID = createCommentDto.parse(req.body);
        const userId: UserId = req.user.id
        const fullDto: CreateCommentWithUserIdDto = {userId, ...dtoWithoutUserID}

        handleExpress(res, () => commentService.createComment(fullDto))
    })

    app.get("/api/comment/:commentId", loginMiddleware(userService), (req, res) =>{
        const id = ZodCommentId.parse(req.params.commentId);
        handleExpress(res, () => commentService.getSingleComment(id))
    })

    app.get("/api/comment/post/:postId", loginMiddleware(userService), (req, res) =>{
        const postId = ZodPostId.parse(req.params.postId)
        const userId = ZodUserId.parse(req.user.id)
        handleExpress(res, () => commentService.getCommentsForPost(postId, userId))
    })

    return app
}