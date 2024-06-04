import dotenv from "dotenv";
dotenv.config();

import IStripeService from "../interfaces/stripeService";
import logger from "../../utilities/logger";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string);

const Logger = logger(__filename);

console.log(process.env.STRIPE_PRIVATE_KEY); // Log the value of STRIPE_PRIVATE_KEY
class StripeService implements IStripeService {
  createCheckoutSessionPayment = async (
    user_id: string,
    amount: number,
    cause_id: number,
  ): Promise<string> => {
    try {
      const session = await stripe.checkout.sessions.create({
        //ui_mode: "embedded",
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price: "$8.99",
            quantity: 1,
          },
        ],
        success_url: `http://localhost:5000/checkout-success`,
        cancel_url: `http://localhost:5000/checkout-cancel`,
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
