
import {UserId} from "../types/userIdType";
import {Username} from "../types/usernameType";
import {Password} from "../types/passwordType";
import { Email } from "../types/emailType";
import { Firstname } from "../types/firstnameType";
import { Lastname } from "../types/lastnameType";
import { Bio } from "../types/bioType";
import { PrivatePage } from "../types/isPrivateType";
import { FollowerCount } from "../../follow/type/follower.type";
import { FollowingCount } from "../../follow/type/following.type";

export interface User {
    id: UserId;
    username: Username;
    password: Password;
    email: Email;
    firstName?: Firstname;
    lastName?: Lastname;
    bio?: Bio;
    profilePicture?: string;
    isPrivate: PrivatePage;
    status?: boolean;
    followerCount: FollowerCount;
    followingCount: FollowingCount;
}   
