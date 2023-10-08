import {Brand} from "../../../utility/brand";
import z from "zod";

export type IsCloseFriend = Brand<boolean, "IsCloseFriend">

export const isCloseFriend = (value : boolean): value  is IsCloseFriend => {
    return typeof value === 'boolean' ;
}

export const zodIsCloseFriend = z.coerce.boolean().refine(isCloseFriend);