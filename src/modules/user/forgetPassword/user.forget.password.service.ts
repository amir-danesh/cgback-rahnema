import {UserForgetPasswordRepository} from "./user.forget.password.repository";
import {UserRepository} from "../user.repository";
import {usernameEmailHandler, usernameIsValidate} from "../../../utility/username-email.handler";
import {extractUserIdFromToken, generateAccessToken} from "../../../utility/jwt.utility";
import bcrypt from "bcrypt";
import {ResetPassTokenDto} from "./dto/resetPassTokenDto";
import {ResetToken} from "./dto/resetToken";
import {Username} from "../types/usernameType";
import {mailSender} from "../../../utility/sendEmail.utility";
import {resetPasswordMessageTemplate} from "../../../utility/resetPasswordMessageTemplate";
import {Password} from "../types/passwordType";
import {NotFoundError, ServerInternalError} from "../../../utility/errors";
import {UserService} from "../user.service";


export class UserForgetPasswordService {
    constructor(private userForgerRepository: UserForgetPasswordRepository,private userService:UserService) {
    }

    async forgetPassword(username: Username) {
        const user= await this.findUser(username);
        if (!user) {
            throw new NotFoundError( 'User not found');
        }
        const token = generateAccessToken(user.id,"6h")
        const resetPasswordTemplate=resetPasswordMessageTemplate(user.username,token)
        const result=   await mailSender("support@collegegram.ir", user.email, "reset password", "reset password", resetPasswordTemplate)
        if (!result){
            throw new ServerInternalError()
        }
        await this.userForgerRepository.save(user.id, token)
        return {
            statusCode: 200,
            response: {
                message: "reset password link sent to your email",
            }
        };
    }
    async findUser(username: Username) {
            return await this.userService.findUserByUsername(username);
    }
    async resetPassword(dto:ResetPassTokenDto) {
        const userForgetPassword = await this.userForgerRepository.findByToken(dto.token);
        if (!userForgetPassword) {
            throw new NotFoundError('token not found');
        }
        const user = await this.userService.getUserForMiddleware(extractUserIdFromToken(dto.token));
        if (!user) {
            throw new NotFoundError( 'User not found');
        }

        await this.userService.updatePassword(await bcrypt.hash(dto.password, 10) as Password, user)
        await this.userForgerRepository.delete(userForgetPassword.id)
        return {
            statusCode: 200,
            response: {
                message: "password successfully changed"
            }
        };
    }

    async checkResetTokenPasswordIsValid(dto:ResetToken) {
        const userForgetPassword = await this.userForgerRepository.findByToken(dto.token);
        if (!userForgetPassword) {
            throw new NotFoundError('token not found');
        }
        return {
            statusCode: 200,
            response: {
                message: "token is valid",
                data:{
                    token: dto.token
                }
            }
        };
    }
}
