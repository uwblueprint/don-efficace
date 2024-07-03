import IImpactService from "../interfaces/impactService";
import { ImpactDTO } from "../../types";
import prisma from "../../prisma";
import logger from "../../utilities/logger";
import { getErrorMessage } from "../../utilities/errorUtils";

const Logger = logger(__filename);

interface ImpactAccumulator {
  [key: number]: ImpactDTO;
}

class ImpactService implements IImpactService {
  async calculateImpactPerUser(userId: string): Promise<Array<ImpactDTO>> {
    try {
      const donations = await prisma.donation.findMany({
        where: { user_id: userId },
        include: {
          cause: {
            include: {
              npos: {
                include: {
                  item: true,
                },
              },
            },
          },
        },
      });

      console.log('donations: ', donations);

      const impactPerCause = donations.reduce<ImpactAccumulator>(
        (acc, donation) => {
          const cause = donation.cause;
          const numNPOs = cause.npos.length;
          const amountPerNPO = donation.amount / numNPOs;

          const items: any = [];

          cause.npos.forEach((npo) => {
            if (npo.item) { 
              const impact = npo.item.impact_ratio * amountPerNPO;
              const item = {
                item_id: npo.item.id,
                item_name: npo.item.name,
                total_impact: impact,
              };

              if (!acc[cause.id]) {
                acc[cause.id] = {
                  cause_id: cause.id,
                  cause_name: cause.name,
                  items: [],
                };
              }

              const existingItem = acc[cause.id].items.find(i => npo.item && i.item_id === npo.item.id);
              if (existingItem) {
                existingItem.total_impact += impact;
              } else {
                acc[cause.id].items.push(item);
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
