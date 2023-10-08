import { Brand } from "../../../utility/brand";
import z from "zod";

export type Body = Brand<string, "Body">;

export const isBody = (value: string): value is Body =>
    value.length < 500
    
const bodyErrorMessage = "body must be maximum 500 lenght"

export const zodBody = z.coerce.string().refine(isBody, {
    message: bodyErrorMessage
});
