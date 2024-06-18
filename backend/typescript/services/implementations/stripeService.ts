import dotenv from "dotenv";

import Stripe from "stripe";
import IStripeService from "../interfaces/stripeService";
import logger from "../../utilities/logger";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string);
const Logger = logger(__filename);
const SUCCESS_URL = `http://localhost:5000/checkout-success`;
const CANCEL_URL = `http://localhost:5000/checkout-cancel`;

const checkoutSessionDefaultOptions: Stripe.Checkout.SessionCreateParams = {
  // ui_mode: "embedded",
  payment_method_types: ["card"],
  mode: "payment",
  success_url: SUCCESS_URL,
  cancel_url: CANCEL_URL,
};

console.log(process.env.STRIPE_PRIVATE_KEY); // Log the value of STRIPE_PRIVATE_KEY

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
                name: `Donation to cause ${cause_id}`
              }
            },
            quantity: 1,
          },
        ],
      });

      if (!session.url) {
        throw new Error("Session URL is null");
      }

      return session.url;
    } catch (error) {
      Logger.error(
        `Error creating a checkout session for a payment for user ${user_id} = ${error}`,
      );
      throw error;
    }
  };
}
export default StripeService;
