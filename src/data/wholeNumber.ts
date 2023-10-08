import { z } from "zod";
import { Brand } from "../utility/brand";
import { Int, isInt } from "./int";

export type WholeNumber = Brand<Int, "WholeNumber">

export const isWholeNumber = (value: number): value is WholeNumber => isInt(value) && value > 0;

export const ZodWholeNumber = z.coerce.number().refine(isWholeNumber , {message:"page must be greater than zero"})