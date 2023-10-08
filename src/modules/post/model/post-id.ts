import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type PostId = Brand<number, "PostId">;

export const isPostId = (id: number): id is PostId => {
  return typeof id === "number" && Number.isInteger(id) && id >= 0;
};

export const ZodPostId = z.coerce.number().refine(isPostId);
