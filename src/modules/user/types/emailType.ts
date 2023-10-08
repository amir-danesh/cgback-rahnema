import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type Email = Brand<string, "Email">;

const hasEmail = (value: string) => /\S+@\S+.\S+/.test(value);

export const isEmail = (value: string): value is Email =>
    value.length <= 255 && 
    hasEmail(value);

const emailErrorMessage = "Email should be a valid email address"

export const zodEmail = z.coerce.string().email().refine(isEmail, {
    message: emailErrorMessage
});
