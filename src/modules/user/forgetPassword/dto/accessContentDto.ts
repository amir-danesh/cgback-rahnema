import {ZodUserId} from "../../types/userIdType";
import {zodUsername} from "../../types/usernameType";
import {z} from "zod";
import {ZodPostId} from "../../../post/model/post-id";

export const accessContentDto = z.object({
    userId: ZodUserId,
    username: zodUsername,
    postId: ZodPostId.optional()
})
export type AccessContentDto = z.infer<typeof accessContentDto>