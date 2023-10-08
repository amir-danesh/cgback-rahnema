import { DataSource, Repository } from "typeorm";
import { UserRepository } from "../user/user.repository";
import { PostImageRepository } from "../post/postImage/postImage.repository";
import { UserEntity } from "../user/entity/user.entity";
import { PostImageEntity } from "../post/postImage/entity/postImage.entity";
import { PostImageUrl } from "../post/postImage/model/postImageCreatePost";

export class ShowImageRepository {
  private userRepo: Repository<UserEntity>;
  private postImageRepo: Repository<PostImageEntity>;
  constructor(private AppDataSource: DataSource) {
    this.userRepo = AppDataSource.getRepository(UserEntity);
    this.postImageRepo = AppDataSource.getRepository(PostImageEntity);
  }
  public async findImageEntity(url: PostImageUrl) {
    const post = await this.findImageInPost(url);
    const user = await this.findImageInUser(url);
    return post ?? user;
  }
  public async findImageInUser(url: PostImageUrl) {
    return await this.userRepo.findOneBy({ profilePicture: url });
  }
  public async findImageInPost(url: PostImageUrl) {
    return await this.postImageRepo.findOneBy({ urlImage: url });
  }
}
