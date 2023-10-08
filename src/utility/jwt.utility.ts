import jwt from "jsonwebtoken";
import {UserId} from "../modules/user/types/userIdType";
import {Token} from "../modules/user/types/token";

export const generateAccessToken = (id: UserId,expiresIn:string):Token => {
    return jwt.sign({id: id}, process.env.TOKEN_SECRET!, {expiresIn: expiresIn}) as Token;

}

export const validationJwtAccessToken = (authorization: Token):boolean => {
    let result = true;
    jwt.verify(authorization, process.env.TOKEN_SECRET!, (err, user) => {
        if (err) {
            return false;
        }
    })
    return result;
}
export const refreshAccessToken = (id : UserId) => {
    // 30 minutes
    return  jwt.sign({id:id}, process.env.REFRESH_TOKEN_SECRET!, {expiresIn: '1800s'});
}

export const extractUserIdFromToken = (token: Token):UserId => {
    const decodedToken = jwt.decode(token) as {id:UserId}
    return decodedToken.id
}
