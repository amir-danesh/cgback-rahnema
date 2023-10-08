import { Router } from "express";
import { BadRequestError } from "../utility/errors";
import {
  PostImageUrl,
  zodPostImageUrl,
} from "../modules/post/postImage/model/postImageCreatePost";
import { ShowImageService } from "../modules/show-image/show-image.service";
import { sendResponse } from "./utils/HTTPResponse";
import { loginMiddleware } from "../utility/login.middleware";
import { UserService } from "../modules/user/user.service";
import { ZodError } from "zod";

export const makeImageRoute = (
  showImageService: ShowImageService,
  userService: UserService
) => {
  const app = Router();
  app.get(
    "/api/images/:imageName",
    async (req, res) => {
      try {
        const imageName = zodPostImageUrl.parse(req.params.imageName);
        const image = await showImageService.getImage(imageName);
        if (!image) {
          sendResponse(res, {
            statusCode: 404,
            response: { message: "Image not found" },
          });
          return;
        }
        res.sendFile(image);
      } catch (error) {
        if (error instanceof ZodError) {
          
            sendResponse(res, {
              statusCode: 400,
              response: { message: error.issues[0].message },
            });
          
        }
      }
    }
  );
  return app;
};
