import { DataSource, Repository } from "typeorm";
import { TagEntity } from "./entity/tag.entity";
import { PostId } from "../model/post-id";
import { TagId } from "./model/tag-id";
import { TagName } from "./model/tag-name";
import { PostEntity } from "../entity/post.entity";

export class TagRepository {
  private tagRepo: Repository<TagEntity>;
  private postRepo: Repository<PostEntity>;
  constructor(AppDataSource: DataSource) {
    this.tagRepo = AppDataSource.getRepository(TagEntity);
    this.postRepo = AppDataSource.getRepository(PostEntity);
  }

  async addTags(tags: TagName[], post: PostEntity): Promise<TagId[]> {
    const tagPromises: Promise<TagEntity>[] = tags.map(async (tag) => {
      let existingTag = await this.tagRepo.findOneBy({ name: tag });

      if (!existingTag) {
        existingTag = this.tagRepo.create({ name: tag });
        existingTag = await this.tagRepo.save(existingTag);
      }

      return existingTag;
    });

    const resolvedTags = await Promise.all(tagPromises);

    const _post = await this.postRepo.findOneBy({ id: post.id });
    if (_post) {
      post.tags = resolvedTags;
      await this.postRepo.save(post);
    }

    const tagIdsSaved: TagId[] = resolvedTags.map((tag) => tag.id);

    return tagIdsSaved;
  }

  async editTags(tags: TagName[], postId: PostId): Promise<TagId[]> {
    const tagPromises: Promise<TagEntity>[] = tags.map(async (tag) => {
      let existingTag = await this.tagRepo.findOneBy({ name: tag });

      if (!existingTag) {
        existingTag = this.tagRepo.create({ name: tag });
        existingTag = await this.tagRepo.save(existingTag);
      }

      return existingTag;
    });

    const resolvedTags = await Promise.all(tagPromises);

    const _post = await this.postRepo.findOneBy({ id: postId });
    if (_post) {
      _post.tags = resolvedTags;
      await this.postRepo.save(_post);
    }

    const tagIdsSaved: TagId[] = resolvedTags.map((tag) => tag.id);

    return tagIdsSaved;
  }
  async getPostsByTagName(tagName: TagName): Promise<TagEntity | null> {
    const tag = await this.tagRepo.findOne({
      where: { name: tagName },
      relations: ['posts','posts.images','posts.user'],
    
    });
    return tag;
  }
}
