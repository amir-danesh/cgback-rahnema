import { z } from "zod";
import { zodBody } from "../type/body";
import { tagName } from "../tag/model/tag-name";
import { ZodPostId } from "../model/post-id";
import { zodIsCloseFriend } from "../type/isCloseFriend";


export const editPostDto = z.object({
  body: zodBody.optional(),
  postId: ZodPostId,
  tags: tagName.Zod.array(),
  isCloseFriend: zodIsCloseFriend,
});

export type EditPostDto = z.infer<typeof editPostDto>;
