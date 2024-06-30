import { Router } from "express";
import ImpactService from "../services/implementations/impactService";
import IImpactService from "../services/interfaces/impactService";
import { getErrorMessage } from "../utilities/errorUtils";

const impactService: IImpactService = new ImpactService();

const impactRouter = Router();

// Get impact per user
impactRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const impacts = await impactService.calculateImpactPerUser(userId);
    res.status(200).json(impacts);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
});

export default impactRouter;
