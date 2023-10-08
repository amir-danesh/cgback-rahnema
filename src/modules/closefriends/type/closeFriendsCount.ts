import {Brand} from "../../../utility/brand";
import {z} from "zod";

export type CloseFriendsCount = Brand<number, "CloseFriendsCount">

export const isCloseFriendsCount=(closeFriendsCount:number):closeFriendsCount is CloseFriendsCount =>{
    return Number.isInteger(closeFriendsCount) && closeFriendsCount >= 0;
}

export const zodCloseFriendsCount = z.coerce.number().refine(isCloseFriendsCount)