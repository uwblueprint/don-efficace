// import { Prisma } from "@prisma/client";
import axios from "axios";
import { Router, Request, Response } from "express";
import { getErrorMessage } from "../utilities/errorUtils";
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import IStripeService from "../services/implementations/stripeService";

require('dotenv').config();

const stripeService: IStripeService = new IStripeService();

const webhookRouter = Router();

// Stripe webhook to handle payment events
webhookRouter.post("/", bodyParser.raw({ type: 'application/json' }), async (request: Request, res: Response) => {
  const sig = request.headers['stripe-signature'];

  if (sig === undefined) {
    return res.status(400).send("Missing Stripe signature header");
  }

  stripeService.evaluateCheckout(sig, request.body, res);
});

export default webhookRouter;
