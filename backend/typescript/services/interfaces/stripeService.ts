import { DonationDTO, Recurrence } from "../../types";

interface IStripeService {
  /**
   * Create a checkout session for a one time payemnt
   * @param user_id user's id
   * @param amount the amount the user is donating toward this cause in the donation
   * @param cause_id the id of the cause the donation is associated with
   * @returns the newly created session url
   * @throws Error if
   */
  createCheckoutSession(
    user_id: string,
    amount: number,
    cause_id: number,
    is_subscription?: boolean
  ): Promise<string>;
}

export default IStripeService;
