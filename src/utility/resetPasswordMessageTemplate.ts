import {Token} from "../modules/user/types/token";

export const resetPasswordMessageTemplate = (username:string, token: Token) => {
    return `
    <h1>Reset Password</h1>
    <p>Hi ${username}</p>
    <p>Click <a href="https://m2pn2acollegegram.darkube.app/newpassword/${token}">here</a> to reset your password</p>
    <p>Or copy this link to your browser</p>
    <p>https://m2pn2acollegegram.darkube.app/newpassword/${token}</p>
    <p>Thanks</p>`;
}
