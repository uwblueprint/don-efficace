import { CauseDTO, Recurrence } from "../../types";

interface ICauseService {
  /**
   * Get all causes across all users
   * @returns an array of CauseDTO
   * @throws Error if Cause retrieval fails
   */
  getAllCauses(): Promise<Array<CauseDTO>>;

  /**
   * Get all causes associated with user_id
   * @param user_id user's id
   * @returns an array of DonationDTO
   * @throws Error if donation retrieval fails
   */
  getUserCauses(user_id: string): Promise<Array<CauseDTO>>;

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
  createCauses(
    user_id: string,
    amount: number,
    cause_id: number,
    is_recurring: string,
    confirmation_email_sent: boolean,
  ): Promise<CauseDTO>;
}

export default ICauseService;
