import {Router} from "express";
import {handleExpress} from "../utility/handleExperess";
import {HomepageService} from "../modules/homepage/homepage.service";
import {loginMiddleware} from "../utility/login.middleware";
import {UserService} from "../modules/user/user.service";


export const makeHomePageRoute = (
    homepageService:HomepageService,
    userService:UserService
) => {
    const app = Router();

    app.get("/api/homepage",loginMiddleware(userService), (req, res) => {
        handleExpress(res,()=>homepageService.getHomepage(req.user.id))
    })

    return app
}