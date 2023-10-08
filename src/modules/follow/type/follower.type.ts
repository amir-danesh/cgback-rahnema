import { number, z } from "zod";
import { Brand } from "../../../utility/brand";

export type FollowerCount = Brand<number, "FollowerCount">;

export const isFollowerCount = (value: number): value is FollowerCount => {
  return Number.isInteger(value) && value >= 0;
};

export const zodFollowerCount = z.coerce.number().refine(isFollowerCount);
