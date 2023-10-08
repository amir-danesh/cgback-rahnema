import { Brand } from "../../../utility/brand";
import { z } from "zod";

export type UserId = Brand<number, "UserId">;

export const isUserId = (userId: number): userId is UserId =>
  typeof userId === "number" && Number.isInteger(userId) && userId >= 1;

export const ZodUserId = z.coerce.number().refine(isUserId);
