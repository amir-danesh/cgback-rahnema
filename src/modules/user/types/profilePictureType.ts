import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type ProfilePicture = Brand<string, "ProfilePicture">;

// THIS NEEDS CHANGES DEFINITELY
export const isProfilePicture = (value: string): value is ProfilePicture => true

export const zodProfilePicture = z.coerce.string().refine(isProfilePicture);
