import { validate, } from "uuid";
import { UUID as cryptoUuId } from "crypto";
import { Brand } from "../utility/brand";
import { z } from "zod";

export type UUID = Brand<cryptoUuId, "UUID">

export const isUUID = (value: string): value is UUID => validate(value)

export const ZodUUID = z.string().refine(isUUID);