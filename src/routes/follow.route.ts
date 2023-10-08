import { Router } from "express";
import { FollowService } from "../modules/follow/follow.service";
import { loginMiddleware } from "../utility/login.middleware";
import { ZodUserId } from "../modules/user/types/userIdType";
import { UserService } from "../modules/user/user.service";
import { handleExpress } from "../utility/handleExperess";

export const makeFollowRoute = (
  followService: FollowService,
  userService: UserService
) => {
  const app = Router();
  app.post("/api/user/follow", loginMiddleware(userService), (req, res) => {
    const followedId = ZodUserId.parse(req.body.userId);
    handleExpress(res, () => followService.followUser(followedId, req.user.id));
  });
  app.delete("/api/user/unfollow", loginMiddleware(userService), (req, res) => {
    const followedId = ZodUserId.parse(req.body.userId);
    handleExpress(res, () =>
      followService.unFollowUser(followedId, req.user.id)
    );
  });
  app.post("/api/user/accept", loginMiddleware(userService), (req, res) => {
    const followedId = ZodUserId.parse(req.body.userId);
    handleExpress(res, () =>
      followService.acceptFollowUser(followedId, req.user.id)
    );
  });
  app.delete("/api/user/deny", loginMiddleware(userService), (req, res) => {
    const followedId = ZodUserId.parse(req.body.userId);
    handleExpress(res, () =>
      followService.denyFollowUser(followedId, req.user.id)
    );
  });
  app.get("/api/user/followers", loginMiddleware(userService),(req, res) => {
    handleExpress(res, () => followService.followersList(req.user.id));
  });
  app.get("/api/user/followings", loginMiddleware(userService),(req, res) => {
    handleExpress(res, () => followService.followingList(req.user.id));
  });

  return app;
};
