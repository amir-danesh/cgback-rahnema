import z from "zod";
import {zodPassword} from "../../types/passwordType";

export const resetPassDto = z.object({
    password: zodPassword
})
export type ResetPassDto = z.infer<typeof resetPassDto>;
