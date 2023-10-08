import {ZodPostId} from "../model/post-id";
import {z} from "zod";

export const requestPostIdDto = z.object({
    postId: ZodPostId
})
export type RequestPostIdDto = z.infer<typeof requestPostIdDto>