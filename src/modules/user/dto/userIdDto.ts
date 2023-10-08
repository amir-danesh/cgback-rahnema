import z from "zod";
import {ZodUserId} from "../types/userIdType";

export const userIdDto = z.object({
    userId: ZodUserId
})
export type UserIdDto = z.infer<typeof userIdDto>