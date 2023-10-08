import { Router } from "express";
import { UserService } from "../modules/user/user.service";
import { loginDto } from "../modules/user/dto/login.dto";
import { handleExpress } from "../utility/handleExperess";
import { AuthenticationError } from "../utility/errors";
import { loginMiddleware } from "../utility/login.middleware";
import { editUserDto } from "../modules/user/dto/edituserDto";
import { createUserDto } from "../modules/user/dto/createUserDto";
import { upload } from "../utility/multerUpload";
import { sendResponse } from "./utils/HTTPResponse";
import { UserForgetPasswordService } from "../modules/user/forgetPassword/user.forget.password.service";
import { userNameDto } from "../modules/user/forgetPassword/dto/userNameDto";
import { resetToken } from "../modules/user/forgetPassword/dto/resetToken";
import { resetPassTokenDto } from "../modules/user/forgetPassword/dto/resetPassTokenDto";
import { Token } from "../modules/user/types/token";
import { refreshTokenDto } from "../modules/user/dto/refreshTokenDto";
import { validationTokenDto } from "../modules/user/dto/validationTokenDto";
import { BlockUserService } from "../modules/user/blockedUsers/blockUser.service";
import { blockUserDto } from "../modules/user/blockedUsers/dto/blockUserDto";
import { createHttpResponse } from "../utility/createHttpResponse";

export const makeUserRoute = (
  userService: UserService,
  forgetPassService: UserForgetPasswordService,
  blockUserService: BlockUserService
) => {
  const app = Router();

  app.post("/api/user/login", (req, res) => {
    const userLoginDto = loginDto.parse(req.body);
    handleExpress(res, async () => {
      const result = await userService.login(userLoginDto);
      const {
        response: {
          data: {
            token,
            refreshToken,
            user: { password: _, ...restUser },
          },
          ...message
        },
        ...data
      } = result;
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .set("Authorization", token);
      return {
        ...data,
        response: { ...message, data: { token } },
      };
    });
  });
  app.post("/api/user/refresh", (req, res) => {
    const dto = refreshTokenDto.parse(req.cookies);
    handleExpress(res, async () => {
      const result = userService.refreshToken(dto.refreshToken);
      const {
        response: {
          data: { token, ...restUser },
          ...message
        },
        ...data
      } = result;
      res.set("Authorization", token);
      return { ...data, response: { ...message, data: { ...restUser } } };
    });
  });

  app.post("/api/user/validate", loginMiddleware(userService), (req, res) => {
    const token = validationTokenDto.parse({
      token: req.headers.authorization,
    });
    if (!token) {
      throw new AuthenticationError("token not found");
    }
    sendResponse(res, {
      statusCode: 200,
      response: {
        message: "ok",
      },
    });
    return;
  });

  app.post("/api/user/signup", (req, res) => {
    const dto = createUserDto.parse(req.body);
    handleExpress(res, () => userService.createUser(dto));
  });

  app.post(
    "/api/user/validate",
    loginMiddleware(userService),
    async (req, res) => {
      const token = validationTokenDto.parse({
        token: req.headers.authorization,
      });
      if (!token) {
        throw new AuthenticationError("token not found");
      }
      sendResponse(res, {
        statusCode: 200,
        response: {
          message: "ok",
        },
      });
      return;
    }
  );

  app.post(
    "/api/user",
    loginMiddleware(userService),
    upload.single("profile"),
    (req, res) => {
      const dto = editUserDto.parse(req.body);
      handleExpress(res, () => userService.editUser(dto, req.user));
    }
  );

  app.post("/api/user/forget-password", (req, res) => {
    const { username } = userNameDto.parse(req.query);
    handleExpress(res, () => forgetPassService.forgetPassword(username));
  });
  app.get("/api/user/reset-password/:token", (req, res) => {
    const dto = resetToken.parse(req.params);
    handleExpress(res, async () => {
      const result = await forgetPassService.checkResetTokenPasswordIsValid(
        dto
      );
      const {
        response: {
          data: { token: resetPasswordToken },
          message,
        },
      } = result;
      res.set("Authorization", resetPasswordToken);
      return result;
    });
  });
  app.post(
    "/api/user/reset-password",
    loginMiddleware(userService),
    (req, res) => {
      const dto = resetPassTokenDto.parse(req.body);
      handleExpress(res, () => forgetPassService.resetPassword(dto));
    }
  );
  app.get("/api/user/block", loginMiddleware(userService), (req, res) => {
    const loggedUserId = req.user.id;
    handleExpress(res, async () =>
      createHttpResponse(
        req,
        await blockUserService.getBlockedUsers(loggedUserId),
        "All Blocked Users"
      )
    );
  });
  app.post(
    "/api/user/block",
    loginMiddleware(userService),
    async (req, res) => {
      const dto = blockUserDto.parse({ ...req.body, userId: req.user.id });
      handleExpress(res, () => blockUserService.blockUser(dto));
    }
  );
  app.delete(
    "/api/user/unblock",
    loginMiddleware(userService),
    async (req, res) => {
      const dto = blockUserDto.parse({ ...req.body, userId: req.user.id });
      handleExpress(res, () => blockUserService.unBlockUser(dto));
    }
  );

  app.get("/api/user", loginMiddleware(userService), (req, res) => {
    handleExpress(res, () => userService.getUser(req.user.id));
  });
  app.get(
    "/api/user/another/:username",
    loginMiddleware(userService),
    (req, res) => {
      handleExpress(res, async () => {
        const dto = userNameDto.parse(req.params);
        const user = await userService.findUserByUsername(dto.username);
        if (!user) {
          throw new AuthenticationError("user not found");
        }
        if (await blockUserService.isUserBlocked(user.id, req.user.id)) {
          throw new AuthenticationError("you are blocked by this user");
        }
        return userService.getByUsername(dto.username, req.user.id);
      });
    }
  );
    
    return app;
};
