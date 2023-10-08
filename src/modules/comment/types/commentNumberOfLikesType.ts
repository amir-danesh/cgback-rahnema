import { Brand } from "../../../utility/brand";
import { z } from "zod";
import { BadRequestError } from "../../../utility/errors";

export type CommentLikeCount = Brand<number, "CommentLikeCount">;

export const isCommentLikeCount = (commentLikeCount: number): commentLikeCount is CommentLikeCount =>
  typeof commentLikeCount === "number" && Number.isInteger(commentLikeCount) && commentLikeCount >= 0;

export const ZodCommentLikeCount = z.coerce.number().refine(isCommentLikeCount);

export const incrementCommentLikeCount = (likeCount: CommentLikeCount): CommentLikeCount => {
  return likeCount + 1 as CommentLikeCount;
}

export const decrementCommentLikeCount = (likeCount: CommentLikeCount): CommentLikeCount => {
  return likeCount - 1 as CommentLikeCount;
}