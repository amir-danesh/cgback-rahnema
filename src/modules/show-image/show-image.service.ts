import { sendResponse } from "../../routes/utils/HTTPResponse";
import { BadRequestError } from "../../utility/errors";
import { PostImageEntity } from "../post/postImage/entity/postImage.entity";
import { PostImageUrl } from "../post/postImage/model/postImageCreatePost";
import { UserEntity } from "../user/entity/user.entity";
import { ShowImageRepository } from "./show-image.repository";

export class ShowImageService {
  constructor(private showImageRepo: ShowImageRepository) {}

  async getImage(url: PostImageUrl) {
    let baseUrl;
    const foundEntity = await this.showImageRepo.findImageEntity(url);
    if (!foundEntity) {
      return undefined;
    }
    if (foundEntity instanceof PostImageEntity) {
      baseUrl = process.cwd() + "/uploads/posts/" + foundEntity.urlImage;
    } else if (foundEntity instanceof UserEntity) {
      baseUrl = process.cwd() + "/uploads/" + foundEntity.profilePicture;
    }
    return baseUrl;
  }
}
