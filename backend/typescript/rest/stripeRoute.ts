import express, { Request, Response } from "express";
import { Router } from "express";
import StripeService from "../services/implementations/stripeService";
import IStripeService from "../services/interfaces/stripeService";

const stripeService: IStripeService = new StripeService();

const stripeRouter = Router();

//const app = express();
//app.use(express.json());

// Endpoint to create a Stripe Checkout session
stripeRouter.post("/create-checkout-session",async (req: Request, res: Response) => {
    try {
      const {user_id, amount, cause_id, is_subscription} = req.body;
      const sessionUrl = await stripeService.createCheckoutSession(user_id, amount, cause_id, is_subscription);
      console.log(`Created checkout session`);
      res.json({ url: sessionUrl });
    } catch (error) {
      res.status(500).json({ error: "Error creating payment checkout session." });
    }
  },
);

/*
stripeRouter.post("/create-checkout-session-subscription", async (req, res) => {
  try {
    const prices = await stripe.prices.list({
      lookup_keys: [req.body.lookup_key],
      expand: ["data.product"],
    });
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      line_items: [
        {
          price: prices.data[0].id,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `http://localhost:5173/checkout-success`,
      cancel_url: `http://localhost:5173/checkout-cancel`,
    });
    res.send({url: session.url});
    //res.redirect(303, session.url);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating subscription checkout session." });
  }
});

stripeRouter.post("/create-portal-session", async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { session_id } = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = YOUR_DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });

  res.redirect(303, portalSession.url);
});
*/
export default stripeRouter;
