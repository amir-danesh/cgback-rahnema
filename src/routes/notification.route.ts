import { NotificationService } from "../modules/notification/notification.service";
import { Router } from "express";
import { handleExpress } from "../utility/handleExperess";
import { UserService } from "../modules/user/user.service";
import { getNotificationDto } from "../modules/notification/dto/getNotificationDto";
import { loginMiddleware } from "../utility/login.middleware";

export const makeNotificationRoute = (
  notificationService: NotificationService,
  userService: UserService
) => {
    const app = Router();

    app.get("/api/notification/self-notifications/:page",loginMiddleware(userService), (req, res) => {
        const userId = req.user.id;
        const page = req.params.page;

        const dto = getNotificationDto.parse({userId, page})
        handleExpress(res, () => notificationService.getSelfNotifications(dto))
    });

    app.get("/api/notification/friends-notifications/:page",loginMiddleware(userService), (req, res) => {
      const userId = req.user.id;
      const page = req.params.page;

      const dto = getNotificationDto.parse({userId, page})
      handleExpress(res, () => notificationService.getFriendsNotifications(dto))
  });
    
    return app;
};
