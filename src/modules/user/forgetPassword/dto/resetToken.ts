import z from "zod";
import {zodToken} from "../../types/token";

export const resetToken = z.object({
    token: zodToken
})
export type ResetToken = z.infer<typeof resetToken>;
