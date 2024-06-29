import { ImpactDTO } from "../../types";

interface IImpactService {
  /**
   * Calculate total impact for each cause that a user has donated to
   * @param user_id user's_id
   * @returns an array of ImpactDTO
   * @throws Error if any of the nested retrievals fail
   */

  calculateImpactPerUser(userId: string): Promise<Array<ImpactDTO>>;

}

export default IImpactService;
