import { DonationDTO, Recurrence } from "../../types";

interface IDonationService {
  /**
   * Calculate the total donations made by a user
   * @param user_id the ID of the user
   * @returns the total amount of donations made by the user
   * @throws Error if total donations calculation fails
   */
  calculateTotalDonations(user_id: string): Promise<number>;

  /**
   * Get all donations across all users
   * @returns an array of DonationDTO
   * @throws Error if donation retrieval fails
   */
  getAllDonations(): Promise<Array<DonationDTO>>;

  /**
   * Get all donations associated with user_id
   * @param user_id user's id
   * @returns an array of DonationDTO
   * @throws Error if donation retrieval fails
   */
  getUserDonation(user_id: string): Promise<Array<DonationDTO>>;

  /**
   * Create a donation
   * @param user_id user's id
   * @param amount the amount the user is donating toward this cause in the donation
   * @param cause_id the id of the cause the donation is associated with
   * @param is_recurring whether or not the donation is reoccurring
   * @param confirmation_email_sent whether or not a confirmation email has been sent
   * @returns the newly created DonationDTO
   * @throws Error if donation cannot be created
   */
  createDonation(
    user_id: string,
    amount: number,
    cause_id: number,
    is_recurring: string,
    confirmation_email_sent: boolean,
  ): Promise<DonationDTO>;
}

export default IDonationService;
