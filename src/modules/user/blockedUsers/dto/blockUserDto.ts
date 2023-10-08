import {z} from "zod";
import {zodUsername} from "../../types/usernameType";
import {ZodUserId} from "../../types/userIdType";

export const blockUserDto = z.object({
    userId: ZodUserId,
    blockUserName: zodUsername
})
export type BlockUserDto = z.infer<typeof blockUserDto>
