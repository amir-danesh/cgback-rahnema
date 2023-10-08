import {Request} from "express";

export const createHttpResponse = <T>(req: Request, data: T, message: string) => {
    const status = req.method === "GET" ? 200 : 201;
    return {
        statusCode: status,
        response: {
            message: message,
            data: data
        }
    }
}