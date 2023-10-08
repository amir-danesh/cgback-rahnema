import { AppDataSource } from "../data-source";
import {
  FollowEntity,
  FollowStatus,
} from "../modules/follow/entity/follow.entity";
import { PostEntity } from "../modules/post/entity/post.entity";
import { TagEntity } from "../modules/post/tag/entity/tag.entity";
import { UserEntity } from "../modules/user/entity/user.entity";
import bcrypt from "bcrypt";

export const seedData = async () => {
  const userRepo = AppDataSource.getRepository(UserEntity);
  const postRepo = AppDataSource.getRepository(PostEntity);
  const tagRepo = AppDataSource.getRepository(TagEntity);
  const followRepo = AppDataSource.getRepository(FollowEntity);

  const userCount = await userRepo.count();
  const postCount = await postRepo.count();
  const tagCount = await tagRepo.count();
  const followCount = await followRepo.count();
  if (userCount === 0) {
    await userRepo.save([
      {
        username: "mojtabasfr",
        email: "mojtabaSfr@gmail.com",
        password: bcrypt.hashSync("rahnemaB123", 10),
      },
      {
        username: "amirDanesh",
        email: "amirDanesh@gmail.com",
        password: bcrypt.hashSync("rahnemaB123", 10),
      },
      {
        username: "poriasbg",
        email: "poriasbg@gmail.com",
        password: bcrypt.hashSync("rahnemaB123", 10),
      },
      {
        username: "nilooo",
        email: "nilo@gmail.com",
        password: bcrypt.hashSync("rahnemaB123", 10),
      },
      {
        username: "niloofar",
        email: "niloofar@gmail.com",
        password: bcrypt.hashSync("rahnemaB123", 10),
      },
      {
        username: "mohammad",
        email: "mohammad@gmail.com",
        password: bcrypt.hashSync("rahnemaB123", 10),
      },
    ]);
  }

  if (followCount === 0) {
    await followRepo.save([
      { userId: 1, followedUserId: 2, state: FollowStatus.PENDING },
      { userId: 1, followedUserId: 3, state: FollowStatus.PENDING },
      { userId: 1, followedUserId: 4, state: FollowStatus.PENDING },
      { userId: 1, followedUserId: 5, state: FollowStatus.PENDING },
      { userId: 1, followedUserId: 6, state: FollowStatus.PENDING },
      { userId: 2, followedUserId: 1, state: FollowStatus.PENDING },
      { userId: 2, followedUserId: 3, state: FollowStatus.PENDING },
      { userId: 2, followedUserId: 4, state: FollowStatus.PENDING },
      { userId: 2, followedUserId: 5, state: FollowStatus.PENDING },
      { userId: 2, followedUserId: 6, state: FollowStatus.PENDING },
      { userId: 3, followedUserId: 1, state: FollowStatus.PENDING },
      { userId: 3, followedUserId: 2, state: FollowStatus.PENDING },
      { userId: 3, followedUserId: 4, state: FollowStatus.PENDING },
      { userId: 3, followedUserId: 5, state: FollowStatus.PENDING },
    ]);
  }

  if (tagCount === 0) {
    await tagRepo.save([
      { name: "ایران" },
      { name: "تهران" },
      { name: "یزد" },
      { name: "بندرعباس" },
      { name: "وطنم" },
      { name: "رهنما" },
      { name: "کافه" },
      { name: "کتاب" },
      { name: "قهوه" },
    ]);
  }
  if (postCount === 0) {
    await postRepo.save([
      {
        body: "mojtaba1",
        userId: 1,
        tags: [{ id: 1 }, { id: 2 }],
        images: [{ urlImage: "1.png" }],
      },
      {
        body: "mojtaba2",
        userId: 1,
        tags: [{ id: 2 }, { id: 3 }],
        images: [{ urlImage: "2.png" }],
      },
      {
        body: "mojtaba3",
        userId: 1,
        tags: [{ id: 5 }, { id: 4 }],
        images: [{ urlImage: "2.png" }],
      },

      {
        body: "amir1",
        userId: 2,
        tags: [{ id: 7 }, { id: 8 }],
        images: [{ urlImage: "1.png" }],
      },
      {
        body: "amir2",
        userId: 2,
        tags: [{ id: 7 }, { id: 9 }],
        images: [{ urlImage: "2.png" }],
      },
      {
        body: "amir3",
        userId: 2,
        tags: [{ id: 8 }, { id: 1 }],
        images: [{ urlImage: "2.png" }],
      },

      {
        body: "poria1",
        userId: 3,
        tags: [{ id: 8 }, { id: 2 }],
        images: [{ urlImage: "2.png" }],
      },
      {
        body: "poria2",
        userId: 3,
        tags: [{ id: 3 }, { id: 2 }],
        images: [{ urlImage: "2.png" }],
      },
      {
        body: "poria3",
        userId: 3,
        tags: [{ id: 4 }, { id: 2 }],
        images: [{ urlImage: "2.png" }],
      },

      {
        body: "nilooo1",
        userId: 4,
        tags: [{ id: 1 }, { id: 5 }],
        images: [{ urlImage: "2.png" }],
      },
      {
        body: "nilooo2",
        userId: 4,
        tags: [{ id: 1 }, { id: 6 }],
        images: [{ urlImage: "1.png" }],
      },
      {
        body: "nilooo3",
        userId: 4,
        tags: [{ id: 8 }, { id: 2 }],
        images: [{ urlImage: "2.png" }],
      },

      {
        body: "nilofar1",
        userId: 5,
        tags: [{ id: 1 }, { id: 2 }],
        images: [{ urlImage: "1.png" }],
      },
      {
        body: "nilofar2",
        userId: 5,
        tags: [{ id: 3 }, { id: 4 }],
        images: [{ urlImage: "1.png" }],
      },
      {
        body: "nilofar3",
        userId: 5,
        tags: [{ id: 2 }, { id: 5 }],
        images: [{ urlImage: "2.png" }],
      },

      {
        body: "mohammad1",
        userId: 6,
        tags: [{ id: 8 }, { id: 2 }],
        images: [{ urlImage: "2.png" }],
      },
      {
        body: "mohammad2",
        userId: 6,
        tags: [{ id: 7 }, { id: 2 }],
        images: [{ urlImage: "1.png" }],
      },
      {
        body: "mohammad3",
        userId: 6,
        tags: [{ id: 3 }, { id: 2 }],
        images: [{ urlImage: "2.png" }],
      },
    ]);
  }
};
