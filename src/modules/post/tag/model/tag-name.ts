import { z } from "zod";
import { Brand } from "../../../../utility/brand";

export type TagName = Brand<string, "TagName">;

export module tagName {
  export const is = (tagName: string): tagName is TagName => {
    return tagName.length >= 2 && tagName.length <= 50;
  };

  export const Zod = z.string().refine(is);
}
