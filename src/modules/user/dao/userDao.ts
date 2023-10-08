import {z} from "zod";
import {zodUsername} from "../types/usernameType";
import {zodFirstname} from "../types/firstnameType";
import {zodLastname} from "../types/lastnameType";
import {zodBio} from "../types/bioType";
import {zodPassword} from "../types/passwordType";
import {ZodUserId} from "../types/userIdType";
import {zodEmail} from "../types/emailType";

export const userDao = z.object({
    username: zodUsername,
    firstName: zodFirstname,
    lastName: zodLastname,
    bio: zodBio,
    profilePicture: z.string().optional(),
})

export type UserDao = z.infer<typeof userDao>;

export const userDaoWithPassword = userDao.extend({
    password: zodPassword
})
export type UserDaoWithPassword = z.infer<typeof userDaoWithPassword>;

export const userDaoWithId = userDao.extend({
    id: ZodUserId
})
export type UserDaoWithId = z.infer<typeof userDaoWithId>;

export const userDaoWithIdAndEmail = userDaoWithId.extend({
    email: zodEmail
})
export type UserDaoWithIdAndEmail = z.infer<typeof userDaoWithIdAndEmail>;

export const userDaoWithIdAndEmailAndFollowCount = userDaoWithIdAndEmail.extend({
    followersCount: z.number(),
    followingCount: z.number()
})
export type UserDaoWithIdAndEmailAndFollowCount = z.infer<typeof userDaoWithIdAndEmailAndFollowCount>;
export const userDaoWithIdAndEmailAndPassword = userDaoWithIdAndEmail.extend({
    password: zodPassword
})
export type UserDaoWithIdAndEmailAndPassword = z.infer<typeof userDaoWithIdAndEmailAndPassword>;