import { Response } from "express";
import { HttpResponseType, sendResponse } from "../routes/utils/HTTPResponse";
import { errorHandler } from "../routes/utils/app-error/errorHandler";


export const handleExpress = async <A>(res: Response, fn: () => Promise<HttpResponseType>) => {
    try {
        const data = await fn();
        sendResponse(res, data);
        return;
    } catch (error) {
        const errorResponse = errorHandler(error);
        sendResponse(res, {
            statusCode: errorResponse.statusCode,
            response: { message: errorResponse.message },
        });
    }
};
