import dotenv from "dotenv";

import Stripe from "stripe";
import IStripeService from "../interfaces/stripeService";
import logger from "../../utilities/logger";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string);
const Logger = logger(__filename);

// Stripe checkout will redirect to these frontend urls upon successful payment or cancel.
const SUCCESS_URL = `${process.env.FRONTEND_URL}/checkout-success`;
const CANCEL_URL = `${process.env.FRONTEND_URL}/checkout-cancel`;

const checkoutSessionDefaultOptions: Stripe.Checkout.SessionCreateParams = {
  payment_method_types: ["card"],
  mode: "payment",
  return_url: SUCCESS_URL,
  // cancel_url: CANCEL_URL,
};

class StripeService implements IStripeService {
  createCheckoutSession = async (
    user_id: string,
    amount: number, // in cents (euro)
    cause_id: number,
  ): Promise<string> => {
    try {
      const session = await stripe.checkout.sessions.create({
        ...checkoutSessionDefaultOptions,
        line_items: [
          {
            price_data: {
              currency: "EUR",
              unit_amount: amount,
              product_data: {
                name: `Donation to cause ${cause_id}`,
              },
            },
            quantity: 1,
          }],
          mode: 'payment',
          ui_mode: 'embedded',
      });

      console.log("session: ", session);

      // if (!session.url) {
      //   console.log("session.url: ", session.url);
      //   throw new Error("Session URL is null");
      // }
      if (session.status != 'open') {
        throw new Error("Session is not open");
      }

      return session.id;
      // return session.url;
    } catch (error) {
      Logger.error(
        `Error creating a checkout session for a payment for user ${user_id} = ${error}`,
      );
      throw error;
    }
  };
}
export default StripeService;
