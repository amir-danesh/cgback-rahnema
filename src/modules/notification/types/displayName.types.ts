import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type DisplayName = Brand<string, "DisplayName">;

export const isDisplayName = (value: string): value is DisplayName =>
    value.length <= 70

const displayNameErrorMessage = "Display name should be less than 70 characters"

export const zodDisplayName = z.coerce.string().refine(isDisplayName, {
    message: displayNameErrorMessage
});
