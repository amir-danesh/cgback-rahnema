import { Router } from "express";
import { CollegegramiesService } from "../modules/collegegramies/collegegramies.service";
import { UserService } from "../modules/user/user.service";
import { loginMiddleware } from "../utility/login.middleware";
import { handleExpress } from "../utility/handleExperess";
import { collegegramiesDto } from "../modules/collegegramies/dto/collegegramiesDto";

export const makeCollegegramiesRoute = (
    collegegramiesService:CollegegramiesService,
    userService:UserService
) => {
    const app = Router();

    app.get("/api/collegegramies",loginMiddleware(userService), (req, res) => {
        const dto = collegegramiesDto.parse(req.query);
        handleExpress(res,()=>collegegramiesService.getCollegegramies(req.user.id,dto.page));
    })

    return app
}