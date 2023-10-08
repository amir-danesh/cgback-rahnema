import { Response } from "express";

export type HttpResponseType = {
    statusCode: number;
    response: {
        message: string;
        data?: any;
    };
};

export const sendResponse = (res: Response, value: HttpResponseType) => {
    const response = { statusCode: value.statusCode, ...value.response }
    res.status(value.statusCode).send(response);
};
