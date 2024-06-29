import { NpoDTO, Recurrence } from "../../types";

interface INpoService {
  /**
   * Get all NPOs
   * @returns an array of NPO DTOs
   * @throws Error if retrieval fails
   */
  getAllNPOs(): Promise<Array<NpoDTO>>;

  /**
   * Get NPO details by ID
   * @param npo_id NPO's ID
   * @returns the NPO DTO
   * @throws Error if retrieval fails
   */
  getNPOById(npo_id: string): Promise<NpoDTO>;

  /**
   * Create a new NPO
   * @param name Name of the NPO
   * @param description Description of the NPO
   * @param location Location of the NPO
   * @returns the newly created NPO DTO
   * @throws Error if creation fails
   */
  createNPO(
    npo_id: string,
    name: string,
    cause: string,
    item_id: number
  ): Promise<NpoDTO>;

  /**
   * Update NPO details
   * @param npo_id NPO's ID
   * @param name Updated name of the NPO
   * @param description Updated description of the NPO
   * @param location Updated location of the NPO
   * @returns the updated NPO DTO
   * @throws Error if update fails
   */
  updateNPO(
    npo_id: string,
    name: string,
    cause: string,
    item_id: number
  ): Promise<NpoDTO>;

  /**
   * Delete an NPO
   * @param npo_id NPO's ID
   * @returns true if deletion is successful, false otherwise
   * @throws Error if deletion fails
   */
  deleteNPO(npo_id: string): Promise<boolean>;
}

export default INpoService;
