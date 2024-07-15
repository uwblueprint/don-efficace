import Stripe from "stripe";

interface IStripeService {
  /**
   * Create a checkout session for a one time payemnt
   * @param user_id user's id
   * @param amount the amount the user is donating toward this cause in the donation
   * @param cause_id the id of the cause the donation is associated with
   * @returns the newly created session url
   * @throws Error if a checkout sessions cannot be created
   */
  createCheckoutSession(
    user_id: string,
    amount: number,
    cause_id: number,
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
}

export default IStripeService;
