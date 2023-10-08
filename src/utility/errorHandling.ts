import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { HttpError } from "./errors";
import multer from "multer";
import { sendResponse } from "../routes/utils/HTTPResponse";

export const errorHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  if (error instanceof ZodError) {
    sendResponse( response, {
      statusCode: 400,
      response: {
        message: error.issues[0].path + " " + error.issues[0].message
      }
    })
    return;

  } else if (error instanceof HttpError) {
    sendResponse( response, {
      statusCode: 400, 
      response: {
        message: error.message
      }
    })
    return;

  } else if (error instanceof multer.MulterError) {
    sendResponse( response, {
      statusCode: 400, 
      response: {
        message: error.message
      }
    })
    return;
    
  } else {
    sendResponse( response, {
      statusCode: 500, 
      response: {
        message: "something went wrong"
      }
    })
    return;

  }

  next();
};
