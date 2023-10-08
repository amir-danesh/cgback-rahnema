import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type Password = Brand<string, "Password">;
export type EditPassword = Brand<string, "EditPassword">;

const hasLowerCase = (value: string) => /[a-z]/.test(value);
const hasUpperCase = (value: string) => /[A-Z]/.test(value);
const hasNumber = (value: string) => /[0-9]/.test(value);

export const isPassword = (value: string): value is Password =>
  value.length >= 8 &&
  value.length <= 128 &&
  hasLowerCase(value) &&
  hasUpperCase(value) &&
  hasNumber(value);

export const isEditPassword = (value: string): value is EditPassword =>
  value.length === 0 || isPassword(value);

const passwordErrorMessage =
  "Password must be between 8 and 128 characters, and include at least one lowercase letter, one uppercase letter, and one number.";

const loginPasswordErrorMessage =
  "username or password is incorrect";

export const zodPassword = z.coerce
  .string()
  .refine((value) => isPassword(value), {
    message: passwordErrorMessage,
  });

export const zodEditPassword = z.coerce
  .string()
  .refine((value) => isEditPassword(value), {
    message: passwordErrorMessage,
  });

export const zodPasswordLogin = z.coerce
  .string()
  .refine((value) => isPassword(value), {
    message: loginPasswordErrorMessage
  })