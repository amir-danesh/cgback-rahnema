import { Bio } from "../types/bioType";
import { Email } from "../types/emailType";
import { Firstname } from "../types/firstnameType";
import { PrivatePage } from "../types/isPrivateType";
import { Lastname } from "../types/lastnameType";
import { Password } from "../types/passwordType";
import { ProfilePicture } from "../types/profilePictureType";
import { UserId } from "../types/userIdType";
import { Username } from "../types/usernameType";

export interface create {

    id: UserId;
    username: Username;
    password: Password;
    email: Email;
    firstName: Firstname;
    lastName: Lastname;
    bio: Bio;
    profilePicture: ProfilePicture;
    isPrivate: PrivatePage;
    status: boolean

}