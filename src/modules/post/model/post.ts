import { NonEmptyString } from "../../../data/nonEmptyString";
import { PostId } from "./post-id";
import { PostImageUrl } from "../postImage/model/postImageCreatePost";
import { Body } from "../type/body";
import { Tag } from "../tag/model/tag";
import { UserId } from "../../user/types/userIdType";
import {isCloseFriend, IsCloseFriend} from "../type/isCloseFriend";

export interface Post {
  id: PostId;
  body: Body;
  userId: UserId;
  images: PostImageUrl[];
  tags?: Tag[];
  isCloseFriend: IsCloseFriend;
}
