import z from "zod";
import {zodToken} from "../types/token";


export const validationTokenDto = z.object({
    token: zodToken
})

export type ValidationTokenDto = z.infer<typeof validationTokenDto>
