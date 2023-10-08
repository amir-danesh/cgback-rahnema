import { number, z } from "zod";
import { Brand } from "../../../utility/brand";

export type FollowingCount = Brand<number, "FollowingCount">;

export const isFollowingCount = (value: number): value is FollowingCount => {
  return Number.isInteger(value) && value >= 0;
};

export const zodFollowerCount = z.coerce.number().refine(isFollowingCount);
