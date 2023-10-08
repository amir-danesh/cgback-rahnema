import z, { date } from "zod";
import { zodFirstname } from "../types/firstnameType";
import { zodLastname } from "../types/lastnameType";
import { zodBio } from "../types/bioType";
import { zodPrivatePage } from "../types/isPrivateType";
import { zodEmail } from "../types/emailType";
import { zodEditPassword, zodPassword } from "../types/passwordType";
export const editUserDto = z.object({
  firstName: zodFirstname,
  lastName: zodLastname,
  bio: zodBio,
  isPrivate: zodPrivatePage,
  email: zodEmail,
  password: zodEditPassword,
  isDeleted: z
    .enum(["true", "false", "True", "False", "TRUE", "FALSE"])
    .transform((value) => value.toLowerCase() === "true"),
  profilePicture: z.string().optional(),
});

export type EditUserDto = z.infer<typeof editUserDto>;

