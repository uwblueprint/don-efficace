import { Router, Request, Response } from "express";
import { getErrorMessage } from "../utilities/errorUtils";

require('dotenv').config();

const receiptRouter = Router();

// Display all donations of the year
receiptRouter.post("/", async (req: any, res: any) => {
  try {
    res.status(200).json({message: "success"})
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
});


export default receiptRouter;
