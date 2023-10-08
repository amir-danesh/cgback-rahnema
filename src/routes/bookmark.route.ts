import {Router} from "express";
import {loginMiddleware} from "../utility/login.middleware";
import {UserService} from "../modules/user/user.service";
import {handleExpress} from "../utility/handleExperess";
import {UserId} from "../modules/user/types/userIdType";
import {BookmarkService} from "../modules/bookmark/bookmark.service";
import {bookmarkDto} from "../modules/bookmark/dto/bookmarkDto";


export const makeBookmarkRoute = (
    bookmarkService: BookmarkService,
    userService: UserService
) => {
    const app = Router();

    app.post("/api/post/bookmark", loginMiddleware(userService), (req, res) => {
        const dto = bookmarkDto.parse({...req.body, userId: req.user.id});
        handleExpress(res, () => bookmarkService.bookmarkPost(dto))
    })

    app.delete("/api/post/bookmark", loginMiddleware(userService), (req, res) => {
        const dto = bookmarkDto.parse({...req.body, userId: req.user.id});
        handleExpress(res, () => bookmarkService.unBookmarkPost(dto))
    })

    app.get("/api/post/bookmark", loginMiddleware(userService), (req, res) => {
        const userId: UserId = req.user.id
        handleExpress(res, () => bookmarkService.getAllBookmarks(userId))
    })

    return app
}