// import { Prisma } from "@prisma/client";
import { Router } from "express";
import prisma from '../prisma';
import DonationService from "../services/implementations/donationService";
import IDonationService from "../services/interfaces/donationService";
import { getErrorMessage } from "../utilities/errorUtils";

const donationService: IDonationService = new DonationService();

const donationRouter = Router();

// display all donations
donationRouter.get("/", async (req: any, res: any) => {
    try {
        const allDonations = await donationService.getAllDonations();

        res.status(200).json(allDonations);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
});

// display all donations made by a user
donationRouter.get("/:id", async (req: any, res: any) => {
    const id = req.params.id;

    try {
        const userDonations = await donationService.getUserDonation(id);

        res.status(200).json(userDonations);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
});

// Each donation has 1 cause associated with it, the donation from user will be split before calling this route.
donationRouter.post("/give", async (req: any, res: any) => {
    try {
        const { user_id, amount, cause_id, is_recurring, confirmation_email_sent } = req.body;

        const newDonation = await donationService.createDonation(
            user_id,
            amount,
            cause_id,
            is_recurring,
            confirmation_email_sent
        );
        res.status(200).json(newDonation);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
})

export default donationRouter;