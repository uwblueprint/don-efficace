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
  if (!validatePrimitive(req.body.user_id, "string")) {
    return res.status(400).send(getApiValidationError("user_id", "string"));
  }
  if (!validatePrimitive(req.body.amount, "integer")) {
    return res.status(400).send(getApiValidationError("amount", "integer"));
  }
  if (!validatePrimitive(req.body.cause_id, "integer")) {
    return res.status(400).send(getApiValidationError("cause_id", "integer"));
  }
  if (req.body.paymentMethod && !validateValueInArray(req.body.paymentMethod, stripeCheckoutMethods)) {
    return res
      .status(400)
      .send(
        getArrayValueValidationError("paymentMethod", stripeCheckoutMethods),
      );
  }

  return next();
};

export const createStripeCustomerRequiredParamsValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!validatePrimitive(req.body.name, "string")) {
    return res.status(400).send(getApiValidationError("name", "string"));
  }
  if (!validatePrimitive(req.body.email, "string")) {
    return res.status(400).send(getApiValidationError("email", "string"));
  }
  if (!validatePrimitive(req.body.paymentMethod, "string")) {
    return res.status(400).send(getApiValidationError("paymentMethod", "string"));
  }

  return next();
};