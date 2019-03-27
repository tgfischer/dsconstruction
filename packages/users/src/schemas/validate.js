import HttpStatus from "http-status-codes";
import asyncHandler from "express-async-handler";

export const types = {
  BODY: "body",
  PARAMS: "params",
  QUERY: "query"
};

export default (schema, type) =>
  asyncHandler(async (req, res, next) => {
    try {
      const result = await schema.validate(req[type]);
      res.locals[type] = result;
      next();
    } catch (err) {
      next({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "The request was invalid"
      });
    }
  });
