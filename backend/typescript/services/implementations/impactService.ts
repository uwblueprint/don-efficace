import IImpactService from "../interfaces/impactService";
import { ImpactDTO } from "../../types";
import prisma from "../../prisma";
import logger from "../../utilities/logger";
import { getErrorMessage } from "../../utilities/errorUtils";

const Logger = logger(__filename);

// Stores accumulated impact data
interface ImpactAccumulator {
  [key: number]: ImpactDTO;
}

class ImpactService implements IImpactService {
  async calculateImpactPerUser(userId: string): Promise<Array<ImpactDTO>> {
    // Fetches donations from db
    try {
      const donations = await prisma.donation.findMany({
        where: { user_id: userId }, // Filters donations by User ID, will be useful once AuthContext is built
        include: {
          cause: {
            // Include cause
            include: {
              npos: {
                // Inlucde NPOs associated with cause
                include: {
                  item: true, // Include items associated with the NPO
                },
              },
            },
          },
        },
      });

      // Runs for each donation, handles causes, and updates accumulator
      const impactPerCause = donations.reduce<ImpactAccumulator>(
        (acc, donation) => {
          const cause = donation.cause;
          const numNPOs = cause.npos.length;
          const amountPerNPO = donation.amount / numNPOs;

          const items: any = [];

          cause.npos.forEach((npo) => {
            if (npo.item) {

              // Calculate impact (donation amount is split equally between all NPOS of that cause)
              const impact = npo.item.impact_ratio * amountPerNPO;
              const item = {
                item_id: npo.item.id,
                item_name: npo.item.name,
                total_impact: impact,
              };

              // Initializer
              if (!acc[cause.id]) {
                acc[cause.id] = {
                  cause_id: cause.id,
                  cause_name: cause.name,
                  items: [],
                };
              }

              const existingItem = acc[cause.id].items.find(
                (i) => npo.item && i.item_id === npo.item.id,
              );
              if (existingItem) {
                existingItem.total_impact += impact; // Update impact count of item if already exists
              } else {
                acc[cause.id].items.push(item); // Otherwise, add item
              }
            }
          });

          return acc;
        },
        {},
      );

      return Object.values(impactPerCause);
    } catch (error) {
      Logger.error(
        `Error calculating impact per user ${userId}: ${getErrorMessage(
          error,
        )}`,
      );
      throw new Error(
        `Error calculating impact per user: ${getErrorMessage(error)}`,
      );
    }
  }
}

export default ImpactService;
