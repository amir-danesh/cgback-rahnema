import { z } from "zod";
import { Brand } from "../../../../utility/brand";

export type Tag = Brand<string, "Tag">;

export const isTag = (value: string): value is Tag =>
  value.length >= 2 && value.length <= 30;

const tagErrorMessage = "Tag is not valid";

export const zodTag = z.coerce.string().refine(isTag, {
  message: tagErrorMessage,
});

export type TagArray = Brand<Array<string>, "TagArray">;

export const isTagArray = (value: Array<string>): value is TagArray =>
  value.length >= 0 && value.length <= 5;

const tagArrayErrorMessage = "Tag must be 5 items";
export const zodTagArray = z
  .string()
  .array()
  .refine(isTagArray, { message: tagArrayErrorMessage });
