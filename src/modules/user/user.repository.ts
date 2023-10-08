import { DataSource, In, Not, Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { User } from "./model/user";
import { createUser } from "./user.service";
import { Username } from "./types/usernameType";
import { Password } from "./types/passwordType";
import { Email } from "./types/emailType";
import { UserId } from "./types/userIdType";
import { PrivatePage } from "./types/isPrivateType";
import { EditUserDao, editUserDao } from "./dao/editUserDao";

export interface EditProfile {
  firstName: string;
  lastName: string;
  isPrivate: boolean;
  email: string;
  password: string;
  bio: string;
  profilePicture: string;
}

export class UserRepository {
  private userRepo: Repository<UserEntity>;

  constructor(AppDataSource: DataSource) {
    this.userRepo = AppDataSource.getRepository(UserEntity);
  }

  public async create(data: createUser): Promise<UserEntity> {
    return await this.userRepo.save({
      username: data.username,
      password: data.password,
      email: data.email,
    });
  }

  public async update(data: EditProfile, user: User): Promise<EditUserDao> {
    const updatedUser = await this.userRepo.save({
      id: user.id,
      username: user.username,
      firstName: data.firstName,
      lastName: data.lastName,
      isPrivate: data.isPrivate,
      email: data.email,
      password: data.password,
      bio: data.bio,
      profilePicture: data.profilePicture,
    });    

    const updatedUserWithoutPassword = editUserDao.parse(updatedUser)
    return updatedUserWithoutPassword
    
  }

  public async getUserById(userId: UserId): Promise<UserEntity | null> {
    return await this.userRepo.findOneBy({ id: userId });
  }

  public async getUserByIdReturnModel(userId: UserId): Promise<User | null> {
    return await this.userRepo.findOneBy({ id: userId });
  }

  public async getFullUserById(userId: UserId): Promise<UserEntity | null> {
    return await this.userRepo.findOneBy({ id: userId });
  }

  public async findByUserName(username: Username): Promise<UserEntity | null> {
    return this.userRepo.findOneBy({ username });
  }
  public async findByEmail(email: Email): Promise<UserEntity | null> {
    return await this.userRepo.findOneBy({ email });
  }
  public async isEmialExists(email: Email, userid: UserId): Promise<boolean> {
    const userWithSameEmail = await this.userRepo.findOne({
      where: { email: email },
    });
    if (!userWithSameEmail) {
      return false;
    }
    if (userWithSameEmail.id !== userid) {
      return true;
    }

    return false;
  }
  async updatePassword(newPassword: Password, user: UserEntity) {
    return this.userRepo.update(user.id, { password: newPassword });
  }
  public async findByUserNameWithRelations(
    username: Username
  ): Promise<UserEntity | null> {
    return this.userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.posts", "post")
      .leftJoinAndSelect("post.images", "image")
      .select(["user.username", "post.id", "image.urlImage"])
      .where("user.username = :username", { username })
      .getOne();
  }

  public async getusersByIds(userIds: UserId[]) {
    return await this.userRepo.find({
      where: { id: In(userIds) },
      select: ["id", "firstName", "lastName", "profilePicture", "username"],
    });
  }

  async getAllowedUsers(users: UserId[]) {
    return await this.userRepo.find({
      where: { id: Not(In(users)), isPrivate: false as PrivatePage},
      select: [
        "id",
        "username",
        "firstName",
        "lastName",
        "profilePicture",
        "followerCount",
        "isPrivate",
      ],
    });
  }

  async isUserIdExist(userId: UserId) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    return !!user;
  }
}
