import { Request, Response, NextFunction } from "express";
import {
  getApiValidationError,
  getArrayValueValidationError,
  validatePrimitive,
  validateValueInArray,
} from "./util";
import { stripeCheckoutMethods } from "../../types";

export const createCheckoutSessionRequiredParamsValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!validatePrimitive(req.body.amount, "integer")) {
    return res.status(400).send(getApiValidationError("amount", "integer"));
  }
  if (!validatePrimitive(req.body.causeId, "integer")) {
    return res.status(400).send(getApiValidationError("causeId", "integer"));
  }
  if (!validateValueInArray(req.body.paymentMethod, stripeCheckoutMethods)) {
    return res
      .status(400)
      .send(
        getArrayValueValidationError("paymentMethod", stripeCheckoutMethods),
      );
  }

  return next();
};
