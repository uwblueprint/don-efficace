import axios from "axios";
import dotenv from "dotenv";
import Stripe from "stripe";
import { Response } from "express";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import IStripeService from "../interfaces/stripeService";
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
    causeId: number,
    paymentMethod: StripeCheckoutMethod,
    interval?: StripeSubscriptionInterval,
    intervalFrequency?: number,
    customerId?: string,
  ): Promise<string> => {
    try {
      const session = await stripe.checkout.sessions.create({
        ...checkoutSessionDefaultOptions,
        mode: paymentMethod,
        ...(customerId && { customer: customerId }),
        line_items: [
          {
            price_data: {
              currency: "EUR",
              unit_amount: amount,
              product_data: {
                name: `Donation to cause ${causeId}`,
              },
              ...(interval &&
                intervalFrequency && {
                recurring: {
                  interval,
                  interval_count: intervalFrequency,
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

  // Evaluate Checkout Method
  async evaluateCheckout(sig: string | string[], body: any, res: Response): Promise<void> {
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (error) {
      res.status(500).json({ error: getErrorMessage(error) });
      return;
    }

    // Handle the event
    if (event && event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.client_reference_id;
      const amount = session.amount_total;
      const isRecurring = session.mode;
      const confirmationEmailSent = true;

      const causeIdString = session.metadata ? session.metadata.causeId : null;
      const causeId: number | null = causeIdString ? parseInt(causeIdString, 10) : null;

      try {
        if (!userId || amount === null || causeId === null || !isRecurring || !confirmationEmailSent) {
          throw new Error('User ID not found in session');
        }

        console.log(`Creating donation: {
          User ID: ${userId},
          Amount: ${amount},
          causeId: ${causeId},
          isRecurring: ${isRecurring},
          confirmationEmailSent: ${confirmationEmailSent}
        }`);

        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/give`, {
          params: {
            userId,
            amount,
            causeId,
            isRecurring,
            confirmationEmailSent,
          },
        });

        res.status(200).send({ received: true });
      } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
      }
    } else {
      res.status(400).end();
    }
  }
};

export default StripeService;
