import {
  AuthenticationError,
  DuplicateValue,
  HttpError,
  NotFoundError,
} from "../../utility/errors";
import {
  extractUserIdFromToken,
  generateAccessToken,
  validationJwtAccessToken,
} from "../../utility/jwt.utility";
import { EditUserDto } from "./dto/edituserDto";
import { User } from "./model/user";
import { UserRepository } from "./user.repository";
import bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/createUserDto";
import {
  usernameEmailHandler,
  usernameIsValidate,
} from "../../utility/username-email.handler";
import { LoginDto } from "./dto/login.dto";
import { HttpResponseType } from "../../routes/utils/HTTPResponse";
import { Email, isEmail } from "./types/emailType";
import { UserId } from "./types/userIdType";
import { Password } from "./types/passwordType";
import { Username } from "./types/usernameType";
import {
  validationTokenDto,
  ValidationTokenDto,
} from "./dto/validationTokenDto";
import { Token } from "./types/token";
import { UserEntity } from "./entity/user.entity";
import { FollowService } from "../follow/follow.service";
import { BlockUserService } from "./blockedUsers/blockUser.service";
import { PostService } from "../post/post.service";
import { FollowRepository } from "../follow/follow.repository";
import { BlockUserRepository } from "./blockedUsers/blockUser.repository";
import { PostRepository } from "../post/post.repository";

export interface createUser {
  username: string;
  email: string;
  password: string;
}

export class UserService {
  constructor(
    private userRepo: UserRepository,
    private followRepo: FollowRepository,
    private blockRepo: BlockUserRepository,
    private postRepo: PostRepository
  ) {}

  private getHash(password: Password, salt: number) {
    return bcrypt.hashSync(password, salt) as Password;
  }
  async findUserByUsername(username: Username) {
    return await this.userRepo.findByUserName(username);
  }

  createUser = async (user: CreateUserDto): Promise<HttpResponseType> => {
    if (await this.userRepo.findByUserName(user.username)) {
      throw new DuplicateValue("username must be unique.");
    }
    if (await this.userRepo.findByEmail(user.email)) {
      throw new DuplicateValue("email must be unique.");
    }
    const create = {
      username: user.username,
      password: this.getHash(user.password as Password, 10),
      email: user.email,
    };
    const user_repo = await this.userRepo.create(create);
    return {
      statusCode: 201,
      response: {
        message: "user added successfully",
        data: { token: this.generateAccessToken(user_repo.id) },
      },
    };
  };

  async showUser(user: User) {
    const userInfo = await this.userRepo.getUserById(user.id);
    if (!userInfo) throw new NotFoundError("user not found");

    const { password, ...toReturn } = userInfo;
    return {
      statusCode: 200,
      response: {
        message: "success",
        data: toReturn,
      },
    };
  }

  async getUserForMiddleware(userId: UserId): Promise<UserEntity> {
    const userInfo = await this.userRepo.getUserById(userId);
    if (!userInfo) throw new NotFoundError("user not found");

    return userInfo;
  }

  async getUser(userId: UserId): Promise<HttpResponseType> {
    const userInfo = await this.userRepo.getUserById(userId);
    if (!userInfo) throw new NotFoundError("user not found");

    const { password, ...toReturn } = userInfo;
    return {
      statusCode: 200,
      response: {
        message: "success",
        data: toReturn,
      },
    };
  }

  async editUser(dto: EditUserDto, user: User) {
    const isEmailDuplicate = await this.userRepo.isEmialExists(
      dto.email,
      user.id
    );
    if (isEmailDuplicate) {
      throw new DuplicateValue("email must be unique");
    }
    const data = {
      firstName: dto.firstName ?? "",
      lastName: dto.lastName ?? "",
      isPrivate: dto.isPrivate,
      email: dto.email || user.email,
      password: this.hashPassword(dto.password as Password, user.password),
      bio: dto.bio ?? "",
      profilePicture: dto.isDeleted
        ? ""
        : dto.profilePicture ?? user.profilePicture ?? "",
    };
    const updatedUser = await this.userRepo.update(data, user);
    return {
      statusCode: 200,
      response: {
        message: "user updated successfully",
        data: updatedUser,
      },
    };
  }

  async viewEditUser(user: User) {
    return await this.userRepo.getUserById(user.id);
  }

  validate(dto: ValidationTokenDto) {
    return validationJwtAccessToken(dto.token);
  }

  private hashPassword(password: Password | undefined, userPassword: Password) {
    if (!password) {
      return userPassword;
    } else {
      return this.getHash(password, 10);
    }
  }

  async login(userDto: LoginDto) {
    const { loginIdentifier, password } = userDto;

    const user = isEmail(loginIdentifier)
      ? await this.userRepo.findByEmail(loginIdentifier)
      : await this.userRepo.findByUserName(loginIdentifier);

    if (!user)
      throw new AuthenticationError(
        "loginIdentifier or password is not correct"
      );

    if (!(await this.comparePassword(password as Password, user.password)))
      throw new AuthenticationError(
        "loginIdentifier or password is not correct"
      );

    const token = this.generateAccessToken(user.id);
    const refreshToken = this.generateAccessToken(user.id, "1d");

    return {
      statusCode: 200,
      response: {
        message: "login successful",
        data: {
          token: token,
          refreshToken: refreshToken,
          user: user,
        },
      },
    };
  }
  async comparePassword(password: Password, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword).then((result) => {
      return result;
    });
  }

  private async findUser(username: Username) {
    return await this.userRepo.findByUserName(username);
  }

  refreshToken(refreshToken: Token) {
    const dto = validationTokenDto.parse({ token: refreshToken });
    const isValid = this.validate(dto);
    if (!isValid) {
      throw new AuthenticationError("token is not valid");
    }
    const userId: UserId = extractUserIdFromToken(dto.token);
    const accessToken = this.generateAccessToken(userId, "6h");
    return {
      statusCode: 200,
      response: {
        message: "refresh successful",
        data: {
          token: accessToken,
          userId: userId,
        },
      },
    };
  }
  generateAccessToken(id: UserId, expiresIn: string = "6h") {
    return generateAccessToken(id, expiresIn);
  }

  async findByEmail(email: Email) {
    return await this.userRepo.findByEmail(email);
  }
  async updatePassword(password: Password, user: UserEntity) {
    return await this.userRepo.updatePassword(password, user);
  }
  async getByUsername(
    username: Username,
    user_id: UserId
  ): Promise<HttpResponseType> {
    const user = await this.userRepo.findByUserName(username);
    if (!user) throw new NotFoundError("user not found");
    const { password: _, ...toReturn } = user;
    const isFollowed =
      (await this.followRepo.isUserFollowed(user_id, user.id)).length > 0
        ? true
        : false;
    const isPending =
      (await this.followRepo.isUserFollowedPending(user_id, user.id)).length > 0
        ? true
        : false;
    const isBlocked = (await this.blockRepo.isUserBlocked(user_id, user.id))
      ? true
      : false;
    const postsCount = await this.postRepo.postsCount(user.id);
    const response = {
      ...toReturn,
      isFollowed,
      isBlocked,
      postsCount,
      isPending,
    };
    return {
      statusCode: 200,
      response: {
        message: "success",
        data: response,
      },
    };
  }

  async isUserIdExist(userId: UserId) {
    return await this.userRepo.isUserIdExist(userId);
  }

  async getAllowedUsers(userIds: UserId[]): Promise<UserEntity[]> {
    return await this.userRepo.getAllowedUsers(userIds);
  }
}
