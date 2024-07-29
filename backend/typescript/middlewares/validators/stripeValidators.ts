import { Request, Response, NextFunction } from "express";
import { getApiValidationError, validatePrimitive } from "./util";

export const createCheckoutSessionValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!validatePrimitive(req.body.user_id, "string")) {
    console.log("user_id", req.body);
    return res.status(400).send(getApiValidationError("user_id", "string"));
  }
  if (!validatePrimitive(req.body.amount, "integer")) {
    return res.status(400).send(getApiValidationError("amount", "integer"));
  }
  if (!validatePrimitive(req.body.cause_id, "integer")) {
    return res.status(400).send(getApiValidationError("cause_id", "integer"));
  }

  return next();
};
