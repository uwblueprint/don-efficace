import { StripeCheckoutMethod, StripeSubscriptionInterval } from "../../types";

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
}

export default IStripeService;
