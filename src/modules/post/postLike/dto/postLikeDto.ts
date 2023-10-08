import {z} from "zod";
import {ZodPostId} from "../../model/post-id";
import {ZodUserId} from "../../../user/types/userIdType";
export const postLikeDto = z.object({
    postId: ZodPostId,
    userId: ZodUserId
})

export type PostLikeDto = z.infer<typeof postLikeDto>;