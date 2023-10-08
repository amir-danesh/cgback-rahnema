import z from "zod";
import { zodFirstname } from "../types/firstnameType";
import { zodLastname } from "../types/lastnameType";
import { zodBio } from "../types/bioType";
import { zodPrivatePage } from "../types/isPrivateType";
import { zodEmail } from "../types/emailType";
import { zodEditPassword } from "../types/passwordType";

export const editUserDao = z.object({
  firstName: zodFirstname,
  lastName: zodLastname,
  bio: zodBio,
  isPrivate: z.boolean(),
  email: zodEmail,
  profilePicture: z.string().optional(),
});

export type EditUserDao = z.infer<typeof editUserDao>;
