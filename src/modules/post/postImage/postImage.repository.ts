import { DataSource, Repository } from "typeorm";
import { PostImageEntity } from "./entity/postImage.entity";
import { PostImageUrl } from "./model/postImageCreatePost";
import { PostId } from "../model/post-id";

export class PostImageRepository {
  private postImageRepo: Repository<PostImageEntity>;
  constructor(AppDataSource: DataSource) {
    this.postImageRepo = AppDataSource.getRepository(PostImageEntity);
  }

  public async addImages(images: PostImageUrl[], postId: PostId): Promise<void> {
    const saveImages: PostImageEntity[] = [];
    images.map(async (image) => {
        const temp = await this.postImageRepo.save({urlImage: image, postId})
        saveImages.push(temp)
    });
  }
}
