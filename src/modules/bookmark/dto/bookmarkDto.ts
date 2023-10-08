import {z} from "zod";
import {ZodUserId} from "../../user/types/userIdType";
import {ZodPostId} from "../../post/model/post-id";

export const bookmarkDto =z.object({
    postId: ZodPostId,
    userId: ZodUserId
})

export type BookmarkDto=z.infer<typeof bookmarkDto>