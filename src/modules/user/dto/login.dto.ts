import {z} from "zod";
import { zodUsername } from "../types/usernameType";
import { zodPasswordLogin } from "../types/passwordType";
import { zodEmail } from "../types/emailType";


export const loginDto = z.object({
    loginIdentifier: z.union([zodUsername, zodEmail]),
    password: zodPasswordLogin,
});

export type LoginDto = z.infer<typeof loginDto>;