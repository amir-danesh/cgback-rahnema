import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type Bio = Brand<string, "Bio">;

export const isBio = (value: string): value is Bio => value.length <= 155 

const bioErrorMessage = "Bio must be less than 155 characters"

export const zodBio = z.coerce.string().refine(isBio, {
    message: bioErrorMessage
});
