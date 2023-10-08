import { z } from "zod";
import { Brand } from "../../../../utility/brand";

export type UrlImage = Brand<string, "UrlImage">;
export module urlImage {
  export const is = (value: string): value is UrlImage => {
    return value.length > 0 && value.includes(".");
  };
  export const zod = z.string().min(0).includes(".");
}
