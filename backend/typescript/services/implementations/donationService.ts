import IDonationService from "../interfaces/donationService";
import { DonationDTO } from "../../types"
import prisma from "../../prisma";
import logger from "../../utilities/logger";
import { getErrorMessage } from "../../utilities/errorUtils";

const Logger = logger(__filename);

class DonationService implements IDonationService {
    async getAllDonations(): Promise<Array<DonationDTO>> {
        try {
            const allDonations = await prisma.donation.findMany();
            
            return allDonations;
        } catch (error) {
            Logger.error(`Error fetching donations. Reason = ${getErrorMessage(error)}`);
            throw error;
        }
    }

    async getUserDonation(user_id: string): Promise<Array<DonationDTO>> {
        try {
            const userDonations = await prisma.donation.findMany({
                where: {
                    user_id: user_id,
                }
            });
            
            return userDonations;
        } catch (error) {
            Logger.error(`Error fetching donation for user ${user_id} = ${error}`);
            throw error;
        }
    }

    async createDonation(user_id: string, amount: number, cause_id: number, is_recurring: boolean, confirmation_email_sent: boolean): Promise<DonationDTO> {
        {
          try {
            const newDonation = await prisma.donation.create({
              data: {
                user_id: user_id,
                amount,
                donation_date: new Date(),
                cause_id: cause_id,
                is_recurring,
                confirmation_email_sent
              },
            });
            return newDonation;
          } catch (error) {

            throw error;
          }
        }
    }
}

export default DonationService;