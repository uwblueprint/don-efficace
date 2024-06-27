import dotenv from "dotenv";

import Stripe from "stripe";
import IStripeService from "../interfaces/stripeService";
import logger from "../../utilities/logger";
import { StripeCheckoutMethod, StripeSubscriptionInterval } from "../../types";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string);
const Logger = logger(__filename);

// Stripe checkout will redirect to these frontend urls upon successful payment or cancel.
const SUCCESS_URL = `${process.env.FRONTEND_URL}/checkout-success`;
const CANCEL_URL = `${process.env.FRONTEND_URL}/checkout-cancel`;

const checkoutSessionDefaultOptions: Stripe.Checkout.SessionCreateParams = {
  payment_method_types: ["card"],
  mode: "payment",
  success_url: SUCCESS_URL,
  cancel_url: CANCEL_URL,
};

class StripeService implements IStripeService {
  createCheckoutSession = async (
    amount: number, // in cents (euro)
    cause_id: number,
    payment_method: StripeCheckoutMethod,
    interval?: StripeSubscriptionInterval,
    interval_frequency?: number,
    customer_id?: string,
  ): Promise<string> => {
    try {
      const session = await stripe.checkout.sessions.create({
        ...checkoutSessionDefaultOptions,
        mode: payment_method,
        ...(customer_id && { customer: customer_id }),
        line_items: [
          {
            price_data: {
              currency: "EUR",
              unit_amount: amount,
              product_data: {
                name: `Donation to cause ${cause_id}`,
              },
              ...(interval &&
                interval_frequency && {
                  recurring: {
                    interval,
                    interval_count: interval_frequency,
                  },
                }),
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
      Logger.error(`Error creating a checkout session: ${error}`);
      throw error;
    }
  };
}
export default StripeService;
