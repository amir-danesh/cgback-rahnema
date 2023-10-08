import {Brand} from "../../../utility/brand";
import {z} from "zod";

export type BookmarkCount = Brand<number, "BookmarkCount">;
export const isBookmarkCount = (value: number): value is BookmarkCount => {
  return Number.isInteger(value) && value >= 0;
}
export const zodBookmarkCount = z.coerce.number().refine(isBookmarkCount);