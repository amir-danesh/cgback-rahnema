import { z } from "zod";
import { zodBody } from "../type/body";
import { zodPostImageUrl } from "../postImage/model/postImageCreatePost";
import { ZodUserId } from "../../user/types/userIdType";
import { tagName } from "../tag/model/tag-name";
import { zodIsCloseFriend } from "../type/isCloseFriend";


export const createPostDto = z.object({
  userId: ZodUserId,
  body: zodBody.optional(),
  tags: tagName.Zod.array(),
  images: z.array(zodPostImageUrl),
  isCloseFriend: zodIsCloseFriend,
});

export type CreatePostDto = z.infer<typeof createPostDto>;
