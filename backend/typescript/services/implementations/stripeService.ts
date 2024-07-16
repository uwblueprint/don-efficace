import Stripe from 'stripe';
import { IStripeService } from '../interfaces/stripeService';
import { Response } from "express";
import { getErrorMessage } from "../../utilities/errorUtils";
import axios from 'axios';

require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10',
  });

class StripeService implements IStripeService {
    async evaluateCheckout(sig: string | string[], body: any, res: Response) : Promise<void> {

    let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }

  // Handle the event
  if (event && event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Assuming your session contains the necessary information
    const userId = session.client_reference_id;
    const amount = session.amount_total;
    // const causeId = session.metadata ? session.metadata.causeId : null; // Assign null if metadata is null
    const isRecurring = session.mode;
    const confirmationEmailSent = true; // Set as needed

    // Check if metadata is null before accessing causeId
    const causeIdString = session.metadata ? session.metadata.causeId : null; // Assign null if metadata is null
    
    // Convert causeIdString to a number
    const causeId: number | null = causeIdString ? parseInt(causeIdString, 10) : null;

    try {
      if (userId === null || amount === null || causeId === null || isRecurring === null || confirmationEmailSent === null) {
        throw new Error("User ID not found in session");
      }

      console.log(`Creating donation : {
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

}

export default StripeService;
