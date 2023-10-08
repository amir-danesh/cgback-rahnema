import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type PaginationBy10 = Brand<number, "PaginationBy10">;

export const isPaginationBy10 = (value: number): value is PaginationBy10 => {
  return Number.isInteger(value) && value >= 1;
};

export const zodPaginationBy10 = z.coerce.number().refine(isPaginationBy10,{
    message: "page should be integer number greater than 0"
});
