import {Brand} from "../../../../utility/brand";
import {z} from "zod";

export type LikeId = Brand<number, "LikeId">;

export const isLikeId = (id: number): id is LikeId => {
    return Number.isInteger(id) && id > 0;
}
export const zodLikeId = z.coerce.number().refine(isLikeId);