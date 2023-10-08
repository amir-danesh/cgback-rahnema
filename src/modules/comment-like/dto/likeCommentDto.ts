import z from "zod";
import { ZodUserId } from "../../user/types/userIdType";
import { ZodCommentId } from "../../comment/types/commenIdType";

export const likeCommentDto = z.object({
    userId: ZodUserId,
    commentId: ZodCommentId
})

export type LikeCommentDto = z.infer<typeof likeCommentDto>