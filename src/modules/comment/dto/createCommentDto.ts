import z from "zod";
import { zodCommentText } from "../types/commentTextType";
import { ZodUserId } from "../../user/types/userIdType";
import { ZodPostId } from "../../post/model/post-id";
import { ZodCommentId } from "../types/commenIdType";

export const createCommentDto = z.object({
    text: zodCommentText,
    postId: ZodPostId,
    parentCommentId: ZodCommentId.optional()
})

export const createCommentWithUserIdDto = createCommentDto.extend({
    userId: ZodUserId
})

export type CreateCommentDto = z.infer<typeof createCommentDto>

export type CreateCommentWithUserIdDto = z.infer<typeof createCommentWithUserIdDto>