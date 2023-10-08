import { z } from "zod";
import { Brand } from "../../../../utility/brand";

export type PostImageId = Brand<number, "PostImageId">;

export module postImageId {
  export const is = (id: number): id is PostImageId => {
    return typeof id === "number" && Number.isInteger(id) && id > 0;
  };

  export const zod = z.coerce.number().refine(is);
}
