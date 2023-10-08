import { Brand } from "../../../utility/brand";
import { z } from "zod";

export type CommentId = Brand<number, "CommentId">;

export const isCommentId = (commentId: number): commentId is CommentId =>
  typeof commentId === "number" && Number.isInteger(commentId) && commentId >= 1;

export const ZodCommentId = z.coerce.number().refine(isCommentId);
