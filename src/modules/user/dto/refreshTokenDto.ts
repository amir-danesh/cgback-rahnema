import {zodToken} from "../types/token";
import {z} from "zod";

export const refreshTokenDto = z.object({
    refreshToken: zodToken
})

export type RefreshTokenDto = z.infer<typeof refreshTokenDto>