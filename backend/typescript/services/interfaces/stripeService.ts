import { StripeCheckoutMethod, StripeSubscriptionInterval } from "../../types";

interface IStripeService {
  /**
   *
   * @param amount Number of cents in euros
   * @param cause_id
   * @param payment_method One of 'payment' or 'subscription'
   * @param interval Required if payment_method = 'subscription'. One of 'day', 'week', 'month' or 'year'
   * @param interval_frequency Required if payment_method = 'subscription'. The number of intervals between subscription billings. Maximum of three years interval allowed (3 years, 36 months, or 156 weeks).
   * @param customer_id Stripe customer Id. New customer will be created if not provided
   */
  createCheckoutSession(
    amount: number,
    cause_id: number,
    payment_method: StripeCheckoutMethod,
    interval?: StripeSubscriptionInterval,
    interval_frequency?: number,
    customer_id?: string,
  ): Promise<string>;
}

export default IStripeService;
