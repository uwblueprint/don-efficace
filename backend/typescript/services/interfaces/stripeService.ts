import { Response } from "express";
import { StripeCheckoutMethod, StripeSubscriptionInterval } from "../../types";

import Stripe from "stripe";

interface IStripeService {
  /**
   *
   * @param amount Number of cents in euros
   * @param causeId
   * @param paymentMethod One of 'payment' or 'subscription'
   * @param interval Required if payment_method = 'subscription'. One of 'day', 'week', 'month' or 'year'
   * @param intervalFrequency Required if payment_method = 'subscription'. The number of intervals between subscription billings. Maximum of three years interval allowed (3 years, 36 months, or 156 weeks).
   * @param customerId Stripe customer Id. New customer will be created if not provided
   */
  createCheckoutSession(
    amount: number,
    causeId: number,
    paymentMethod: StripeCheckoutMethod,
    interval?: StripeSubscriptionInterval,
    intervalFrequency?: number,
    customerId?: string,
  ): Promise<string>;

  /**
   * Create a customer
   * @param name the user's name
   * @param email the user's email
   * @param paymentMethod a payment method object from stripe to attach to the customer
   * @returns a Customer object
   * @throws Error if customer cannot be created
   */
  createCustomer(
    name: string,
    email: string,
    paymentMethod: string,
  ): Promise<Stripe.Customer>;

  evaluateCheckout(
    sig: string | string[],
    body: any,
    res: Response
  ): Promise<void>;
}

export default IStripeService
