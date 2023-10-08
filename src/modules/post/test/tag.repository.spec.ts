import { DataSource, Repository } from "typeorm";
import { TagRepository } from "../tag/tag.repository";
import { TagName } from "../tag/model/tag-name";
import { Tag } from "../tag/model/tag";
import { AppDataSource } from "../../../data-source";
import { TagEntity } from "../tag/entity/tag.entity";
import { any } from "zod";

describe("TagRepository", () => {
  let dataSource: DataSource;
  let tagRepo: TagRepository;
  let TagDatabse: Repository<TagEntity>;
  beforeAll(async () => {
    dataSource = await AppDataSource.initialize();
    tagRepo = new TagRepository(dataSource);
    TagDatabse = AppDataSource.getRepository(TagEntity);
  });
  afterAll(async () => {
    await AppDataSource.destroy();
  });
  describe("createTag", () => {
    it("should create a new tag", async () => {
      const tagName = "Qom" as TagName;
      await tagRepo.createTag(tagName);
      const savedTag = await TagDatabse.findOneBy({ name: tagName });
      expect(savedTag?.name).toBe(tagName);
    });
  });
});
