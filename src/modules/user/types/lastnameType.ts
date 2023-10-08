import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type Lastname = Brand<string, "Lastname">;

export const isLastname = (value: string): value is Lastname =>
    value.length <= 35

const lastnameErrorMessage = "Firstname should be less than 35 characters"

export const zodLastname = z.coerce.string().refine(isLastname, {
    message: lastnameErrorMessage
});
