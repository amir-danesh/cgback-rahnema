import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type Firstname = Brand<string, "Firstname">;

export const isFirstname = (value: string): value is Firstname =>
    value.length <= 35

const firstnameErrorMessage = "Firstname should be less than 35 characters"

export const zodFirstname = z.coerce.string().refine(isFirstname, {
    message: firstnameErrorMessage
});
