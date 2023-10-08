import { Router } from "express";
import { CommentLikeService } from "../modules/comment-like/commentLike.service";
import { loginMiddleware } from "../utility/login.middleware";
import { UserService } from "../modules/user/user.service";
import { ZodCommentId } from "../modules/comment/types/commenIdType";
import { handleExpress } from "../utility/handleExperess";
import { UserId } from "../modules/user/types/userIdType";
import { LikeCommentDto } from "../modules/comment-like/dto/likeCommentDto";

export const makeCommentLikeRoute = (
    commentLikeSerive: CommentLikeService,
    userService: UserService) => {
    const app = Router();

    app.post("/api/comment-like/like/:commentId", loginMiddleware(userService), (req, res) => {
        const commentId = ZodCommentId.parse(req.params.commentId);
        const userId: UserId = req.user.id
        const dto: LikeCommentDto = { userId, commentId}
        handleExpress(res, () => commentLikeSerive.likeComment(dto))
    })

    app.delete("/api/comment-like/unlike/:commentId", loginMiddleware(userService), (req, res) => {
        const commentId = ZodCommentId.parse(req.params.commentId);
        const userId: UserId = req.user.id
        const dto: LikeCommentDto = { userId, commentId }
        handleExpress(res, () => commentLikeSerive.unlikeComment(dto))
    })

    return app
}