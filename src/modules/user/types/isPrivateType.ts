import { boolean, z } from "zod";
import { Brand } from "../../../utility/brand";

export type PrivatePage = Brand<boolean, "PrivatePage">;

export const isPrivatePage = (value: boolean): value is PrivatePage => value;

const privatePageErrorMessage = "PrivatePage should be true or false";

export const zodPrivatePage = z
  .enum(["true", "false"])
  .transform((value) => value === "true");

