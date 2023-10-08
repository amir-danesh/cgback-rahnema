import { Brand } from "../../../utility/brand";
import { z } from "zod";

export type CommentCount = Brand<number, "CommentCount">;

export const isCommentCount = (like: number): like is CommentCount => {
  return typeof like === "number" && Number.isInteger(like) && like >= 0;
};
export const zodLikeCount = z.coerce.number().refine(isCommentCount);
