import {PostId} from "../../post/model/post-id";
import {UserId} from "../../user/types/userIdType";
import {PostImageEntity} from "../../post/postImage/entity/postImage.entity";
import {TagEntity} from "../../post/tag/entity/tag.entity";
import {Body} from "../../post/type/body";


export interface BookmarkedPost {
  id: PostId;
  body: Body;
  userId: UserId;
  images: PostImageEntity[];
  tags?: TagEntity[]
}
