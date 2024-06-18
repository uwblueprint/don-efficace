import express, { Request, Response, Router } from "express";

import StripeService from "../services/implementations/stripeService";
import IStripeService from "../services/interfaces/stripeService";

const stripeService: IStripeService = new StripeService();

const stripeRouter = Router();

// Endpoint to create a Stripe Checkout session
stripeRouter.post(
  "/create-checkout-session",
  async (req: Request, res: Response) => {
    try {
      const { user_id, amount, cause_id } = req.body;
      const sessionUrl = await stripeService.createCheckoutSession(
        user_id,
        amount,
        cause_id,
      );
      res.json({ url: sessionUrl });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creating payment checkout session." });
    }
  },
);

export default stripeRouter;
