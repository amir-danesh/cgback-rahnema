import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type Username = Brand<string, "Username">;

export const isUsername = (value: string): value is Username =>
  /^(?![\d@])[^-\s]/.test(value) && value.length >= 4 && value.length <= 64;

export const zodUsername = z
  .coerce.string()
  .refine(isUsername, {
    message: "Username must contain only letters and underscores and be between 4 and 64 characters long.",
  });
