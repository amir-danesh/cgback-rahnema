import z from "zod";
import {zodPassword} from "../../types/passwordType";
import {zodToken} from "../../types/token";


export const resetPassTokenDto = z.object({
    password: zodPassword,
    token: zodToken
})
export type ResetPassTokenDto = z.infer<typeof resetPassTokenDto>;
