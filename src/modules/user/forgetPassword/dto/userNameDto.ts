import z from "zod";
import {zodUsername} from "../../types/usernameType";

export const userNameDto = z.object({
    username: zodUsername,
})

export type UserNameDto = z.infer<typeof userNameDto>;
