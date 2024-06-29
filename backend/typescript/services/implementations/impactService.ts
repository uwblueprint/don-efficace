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
                                    item: true
                                }
                            }
                        }
                    }
                }
            });

            const impactPerCause = donations.reduce<ImpactAccumulator>((acc, donation) => {
                const cause = donation.cause;
                const impact = cause.npos.reduce((total, npo) => {
                    return npo.item ? total + npo.item.impact_ratio : total;
                }, 0);
                
                if (acc[cause.id]) {
                    acc[cause.id].total_impact += impact;
                } else {
                    acc[cause.id] = {
                        cause_id: cause.id,
                        cause_name: cause.name,
                        total_impact: impact
                    };
                }
                return acc;
            }, {});

            return Object.values(impactPerCause);
        } catch (error) {
            Logger.error(`Error calculating impact per user ${userId}: ${getErrorMessage(error)}`);
            throw new Error(`Error calculating impact per user: ${getErrorMessage(error)}`);
        }
    }
}

export default ImpactService;
