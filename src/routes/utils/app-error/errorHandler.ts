import { ValidationError, AuthenticationError, BadRequestError, NotFoundError, CustomError, EmailNotFound } from "../../../utility/errors";
import { ZodError } from "zod";
import { TokenExpiredError } from "jsonwebtoken";

interface errorResponse {
    message: string;
    statusCode: number;
}

export const errorHandler = (err: unknown): errorResponse => {
    let response: errorResponse;

    if (err instanceof Error) {
        switch (true) {
            case err instanceof ZodError:
                response = {
                    message: err.message,
                    statusCode: 400,
                };
                break;

            case err instanceof AuthenticationError:
                response = {
                    message: err.message,
                    statusCode: (err as CustomError).statusCode,
                };
                break;

            case err instanceof ValidationError:
                response = {
                    message: err.message,
                    statusCode: (err as CustomError).statusCode,
                };
                break;

            case err instanceof BadRequestError:
                response = {
                    message: err.message,
                    statusCode: (err as CustomError).statusCode,
                };
                break;

            case err instanceof NotFoundError:
                response = {
                    message: err.message,
                    statusCode: (err as CustomError).statusCode,
                };
                break;

            case err instanceof EmailNotFound:
                response = {
                    message: (err as CustomError).message,
                    statusCode: (err as CustomError).statusCode,
                };
                break;

            case err instanceof TokenExpiredError:
                response = {
                    message: "token is expired",
                    statusCode: 403,
                };
                break;

            default:
                response = {
                    message: err.message,
                    statusCode: (err as CustomError).statusCode,
                };
                console.log(err)
                break;
        }
    } else {
        response = {
            message: "An unexpected error occurred",
            statusCode: 500,
        };
        console.log(err)
    }
    return response;
};
