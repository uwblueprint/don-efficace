import { Request, Response, Router } from "express";

import StripeService from "../services/implementations/stripeService";
import IStripeService from "../services/interfaces/stripeService";
import { createCheckoutSessionValidator } from "../middlewares/validators/stripeValidators";

const stripeService: IStripeService = new StripeService();

const stripeRouter = Router();

// Endpoint to create a Stripe Checkout session
stripeRouter.post(
  "/create-checkout-session",
  createCheckoutSessionValidator,
  async (req: Request, res: Response) => {
    try {
      const { userId, amount, causeId } = req.body;

      console.log(
        `Received request: user_id=${userId}, amount=${amount}, cause_id=${causeId}`,
      );

      const sessionUrl = await stripeService.createCheckoutSession(
        userId,
        amount,
        causeId,
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
