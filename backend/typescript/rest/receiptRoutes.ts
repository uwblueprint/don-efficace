// import { Prisma } from "@prisma/client";
import axios from "axios";
import { Router, Request, Response } from "express";
import prisma from "../prisma";
import { getErrorMessage } from "../utilities/errorUtils";
import bodyParser from 'body-parser';

require('dotenv').config();

const receiptRouter = Router();

// display all donations
receiptRouter.get("/:year", async (req: any, res: any) => {
  try {
    res.status(200).json({message: "yerrrrrrrrr"})
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
});


export default receiptRouter;
