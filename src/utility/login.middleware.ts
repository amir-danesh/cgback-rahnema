import {NextFunction, Request, Response} from "express";
import {UserService} from "../modules/user/user.service";
import {sendResponse} from "../routes/utils/HTTPResponse";
import jwt from "jsonwebtoken";
import {AuthenticationError, ServerInternalError,} from "./errors";
import {errorHandler} from "../routes/utils/app-error/errorHandler";

export const loginMiddleware =
  (userService: UserService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      sendResponse(res, {
        statusCode: 401,
        response: {
          message: "user is not authenticated",
        },
      });
      return;
    }

    const tokenSecret = process.env.TOKEN_SECRET;
    if (!tokenSecret) throw new ServerInternalError("token secret not found");

    try {
      const decodedToken = jwt.verify(token, tokenSecret);

      if (!decodedToken)
        throw new AuthenticationError("user is not authenticated");
      if (typeof decodedToken === "string")
        throw new ServerInternalError("token verification failed");

      req.user = await userService.getUserForMiddleware(decodedToken.id);
    } catch (error) {
      const errorResponse = errorHandler(error);

      sendResponse(res, {
        statusCode: errorResponse.statusCode,
        response: { message: errorResponse.message },
      });
      return;
    }
    next();
  };
