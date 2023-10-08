import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type ProfileStatus = Brand<boolean, "ProfileStatus">;

export const isProfileStatus = (value: boolean): value is ProfileStatus => value;

const profileStatusErrorMassage = "PrivatePage should be active or deactive";

export const zodPrivatePage = z
  .enum(["active", "deactive"])
  .transform((value) => value === "active").refine(isProfileStatus, {
    message: profileStatusErrorMassage
  });

