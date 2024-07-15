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

stripeRouter.post("/create-customer", async(req: Request, res: Response) => {
    try {
        const { name, email, paymentMethod } = req.body;
        const customer = await stripeService.createCustomer(
            name, 
            email,
            paymentMethod
        );
        res.send(customer)
    } catch (error) {
        res
          .status(500)
          .json({ error: "Error creating a customer." });
    }
  },
);

export default stripeRouter;
