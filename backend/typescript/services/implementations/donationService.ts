import IDonationService from "../interfaces/donationService";
import { DonationDTO, Recurrence } from "../../types";
import prisma from "../../prisma";
import logger from "../../utilities/logger";
import { getErrorMessage } from "../../utilities/errorUtils";

const Logger = logger(__filename);

class DonationService implements IDonationService {
  getAllDonations = async (): Promise<Array<DonationDTO>> => {
    try {
      const allDonations = await prisma.donation.findMany();

      return allDonations;
    } catch (error) {
      Logger.error(
        `Error fetching donations. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  };

  getUserDonation = async (userId: string): Promise<Array<DonationDTO>> => {
    try {
      const userDonations = await prisma.donation.findMany({
        where: {
          user_id: userId,
        },
      });

      return userDonations;
    } catch (error) {
      Logger.error(`Error fetching donation for user ${userId} = ${error}`);
      throw error;
    }
  };

  createDonation = async (
    userId: string,
    amount: number,
    causeId: number,
    isRecurring: string,
    confirmationEmailSent: boolean,
  ): Promise<DonationDTO> => {
    try {
      const newDonation = await prisma.donation.create({
        data: {
          user_id: userId,
          amount,
          donation_date: new Date(),
          cause_id: causeId,
          is_recurring: isRecurring as Recurrence,
          confirmation_email_sent: confirmationEmailSent,
        },
      });
      return newDonation;
    } catch (error) {
      Logger.error(`Error creating donation for user ${userId} = ${error}`);
      throw error;
    }
  };
}

export default DonationService;
