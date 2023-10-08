import { z } from "zod";
import { Brand } from "../../../../utility/brand";

export type TagId = Brand<number, "TagId">;

export module tagId {
  export const is = (id: number): id is TagId => {
    return typeof id === "number" && Number.isInteger(id) && id > 0;
  };

  export const Zod = z.number().refine(is);
}
