import { Request, Response, Router } from "express";

import StripeService from "../services/implementations/stripeService";
import IStripeService from "../services/interfaces/stripeService";
import {
  createCheckoutSessionRequiredParamsValidator,
  createStripeCustomerRequiredParamsValidator,
} from "../middlewares/validators/stripeValidators";

const stripeService: IStripeService = new StripeService();

const stripeRouter = Router();

// Endpoint to create a Stripe Checkout session
stripeRouter.post(
  "/create-checkout-session",
  createCheckoutSessionRequiredParamsValidator,
  async (req: Request, res: Response) => {
    console.log("Received request at /stripe/create-checkout-session:", req.body); // Logging
    try {
      const {
        amount,
        causeId,
        paymentMethod,
        interval,
        intervalFrequency,
        customerId,
      } = req.body;
      const sessionUrl = await stripeService.createCheckoutSession(
        amount,
        causeId,
        paymentMethod,
        interval,
        intervalFrequency,
        customerId,
      );
      res.json({ url: sessionUrl });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creating payment checkout session." });
    }
  },
);

stripeRouter.post(
  "/create-customer",
  createStripeCustomerRequiredParamsValidator,
  async (req: Request, res: Response) => {
    try {
      const { name, email, paymentMethod } = req.body;
      const customer = await stripeService.createCustomer(
        name,
        email,
        paymentMethod,
      );
      res.send(customer);
    } catch (error) {
      res.status(500).json({ error: "Error creating a customer." });
    }
  },
);

export default stripeRouter;
