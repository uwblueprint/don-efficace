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

/* Returns json in this format: 
    [
      {
        "cause_id": 1,
        "cause_name": "Homeless Shelters",
        "items": [
          {
            "item_id": 1,
            "item_name": "Toiletries",
            "total_impact": 112.5
          },
          {
            "item_id": 2,
            "item_name": "Food",
            "total_impact": 75
          }
        ]
      },
      {
        "cause_id": 2,
        "cause_name": "Cleaning the Environment",
        "items": [
          {
            "item_id": 3,
            "item_name": "Trees Planted",
            "total_impact": 5
          },
          {
            "item_id": 4,
            "item_name": "Beehives",
            "total_impact": 100
          },
          {
            "item_id": 5,
            "item_name": "Beaches Cleaned",
            "total_impact": 10
          }
        ]
      }
    ]
*/

export default IImpactService;
