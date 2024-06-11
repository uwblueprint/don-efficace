// import { Prisma } from "@prisma/client";
import { Router, Request, Response } from "express";
import prisma from "../prisma";
import DonationService from "../services/implementations/donationService";
import IDonationService from "../services/interfaces/donationService";
import { getErrorMessage } from "../utilities/errorUtils";
import Stripe from 'stripe';
import bodyParser from 'body-parser';

const stripe = new Stripe('your-stripe-secret-key', {
  apiVersion: '2024-04-10',
});

const donationService: IDonationService = new DonationService();

const donationRouter = Router();

// display all donations
donationRouter.get("/", async (req: any, res: any) => {
  try {
    const allDonations = await donationService.getAllDonations();
    console.log("getting donations");
    res.status(200).json(allDonations);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
});

// display all donations made by a user
donationRouter.get("/:id", async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const userDonations = await donationService.getUserDonation(id);

    res.status(200).json(userDonations);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
});

// Each donation has 1 cause associated with it, the donation from user will be split before calling this route.
donationRouter.post("/give", async (req: any, res: any) => {
  try {
    const { userId, amount, causeId, isRecurring, confirmationEmailSent } =
      req.body;

    const newDonation = await donationService.createDonation(
      userId,
      amount,
      causeId,
      isRecurring,
      confirmationEmailSent,
    );
    res.status(200).json(newDonation);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
});

const endpointSecret = "whsec_5b54bda18bea945a75f7bc81720b63f384eefcc77aba1750f4446f73d4ee7f86";

// Stripe webhook to handle payment events
donationRouter.post("/webhook", bodyParser.raw({ type: 'application/json' }), async (request: Request, res: Response) => {
  const sig = request.headers['stripe-signature'];

  if (sig === undefined) {
    return res.status(400).send("Missing Stripe signature header");
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
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

      await donationService.createDonation(userId, amount, causeId, isRecurring, confirmationEmailSent);
      res.status(200).send({ received: true });
    } catch (error) {
      res.status(500).json({ error: getErrorMessage(error) });
    }
  } else {
    res.status(400).end();
  }
});

export default donationRouter;
