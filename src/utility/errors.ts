export interface CustomError extends Error {
    statusCode: number;
}

export class AppError extends Error implements CustomError {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class HttpError extends AppError {
    constructor(statusCode: number, message: string) {
        super(message, statusCode);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = " Forbidden") {
        super(message, 403);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = " Not Found") {
        super(message, 404);
    }
}

export class AuthenticationError extends AppError {
    constructor(message: string) {
        super(message, 401);
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string, statusCode: number = 400) {
        super(message, statusCode);
    }
}

export class DuplicateValue extends AppError {
    constructor(message: string, statudCode: number = 400) {
        super(message, statudCode);
    }
}

export class DataNotFound extends AppError {
    constructor(message: string, statudCode: number = 404) {
        super(message, statudCode);
    }
}

export class ServerInternalError extends AppError {
    constructor(message: string = "An internal server error occurred") {
        super(message, 500);
    }
}

export class EmailServiceError extends AppError {
    constructor(message: string) {
        super(message, 500);
    }
}

export class EnvironmentVariableError extends AppError {
    constructor(message: string = "An internal server error occurred") {
        super(message, 500);
    }
}

export class EmailNotFound extends AppError {
    constructor(message: string = "email not found") {
        super(message, 404);
    }
}
