import { describe } from "node:test";
import { AppDataSource } from "../../../data-source";
import { CreatePost, PostRepository } from "../post.repository";
import { UrlImage } from "../postImage/model/urlIlmage";
import { PostId } from "../model/post-id";
import { DataSource } from "typeorm";
import { PostImageId } from "../postImage/model/postImage-id";

describe("create post with image", () => {
  let dataSource: DataSource;
  let postRepo: PostRepository;
  beforeAll(async () => {
    dataSource = await AppDataSource.initialize();
    postRepo = new PostRepository(dataSource);
  });
  afterAll(async () => {
    await AppDataSource.destroy();
  });
  describe("createPost", () => {
    it("should create a new post", async () => {
      const createPost: CreatePost = {
        body: "Hello world With 3 Images",
        userId: 1,
        images: [
          {id : 1 as PostImageId, urlImage: "image1.jpg" as UrlImage },
          {id : 2 as PostImageId, urlImage: "image2.jpg" as UrlImage },
          {id : 3 as PostImageId, urlImage: "image3.jpg" as UrlImage },
        ],
        tags: [],
      };

      const createdPost = await postRepo.createPost(createPost);

      expect(createdPost).toBeDefined();
      expect(createdPost.body).toBe(createPost.body);
      expect(createdPost.userId).toBe(createPost.userId);
    });
  });

  describe("getPostById", () => {
    it("should return a post for a given post id", async () => {
      const postId = 1 as PostId;

      const post = await postRepo.getPostById(postId);

      expect(post).toBeDefined();
      expect(post?.id).toBe(postId);
    });

    it("should return null if post id does not exist", async () => {
      const postId = 999 as PostId;

      const post = await postRepo.getPostById(postId);

      expect(post).toBeNull();
    });
  });

  describe("getPostByUserId", () => {
    it("should return posts for a given user id", async () => {
      const userId = 1;

      const posts = await postRepo.getPostByUserId(userId);

      expect(posts).toBeDefined();
      expect(posts.length).toBeGreaterThan(0);
    });
  });
});
