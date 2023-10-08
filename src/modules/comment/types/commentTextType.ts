import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type CommentText = Brand<string, "CommentText">;

export const isCommentText = (value: string): value is CommentText => value.length <= 2200 

const commentTextErrorMessage = "Comment should be less than 2200 characters long"

export const zodCommentText = z.coerce.string().refine(isCommentText, {
    message: commentTextErrorMessage
});
