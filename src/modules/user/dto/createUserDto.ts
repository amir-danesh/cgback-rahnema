import z from "zod";
import { zodUsername } from "../types/usernameType";
import { zodPassword } from "../types/passwordType";
import { zodEmail } from "../types/emailType";

export const createUserDto = z.object({
    username: zodUsername,
    password: zodPassword,
    email: zodEmail
})

export type CreateUserDto = z.infer<typeof createUserDto>