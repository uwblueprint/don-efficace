import { Request, Response, Router } from "express";

import StripeService from "../services/implementations/stripeService";
import IStripeService from "../services/interfaces/stripeService";
import { createCheckoutSessionValidator } from "../middlewares/validators/stripeValidators";

const stripeService: IStripeService = new StripeService();

const stripeRouter = Router();

// Endpoint to create a Stripe Checkout session
stripeRouter.post(
  "/create-checkout-session",
  // createCheckoutSessionValidator,
  async (req: Request, res: Response) => {
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

export default stripeRouter;
