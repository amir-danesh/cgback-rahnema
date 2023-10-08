import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { HttpError } from "./errors";
import { sendResponse } from "../routes/utils/HTTPResponse";

export const finalErrorHandling: ErrorRequestHandler = (error, request, response, next) => {
    if (error instanceof ZodError) {
        sendResponse(response, {
            statusCode: 400,
            response: {
                message: error.issues[0].message,
            },
        });
        return;
    } else {
        sendResponse(response, {
            statusCode: 500,
            response: {
                message: `something went wrong: ${error.message}`,
            },
        });
    }

    next();
};
