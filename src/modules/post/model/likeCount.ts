import {Brand} from "../../../utility/brand";
import {z} from "zod";

export type LikeCount = Brand<number, "LikeCount">

export const isLikeCount=(like:number):like is LikeCount =>{
    return typeof like === "number" && Number.isInteger(like) && like >= 0;
}
 export const zodLikeCount = z.coerce.number().refine(isLikeCount)