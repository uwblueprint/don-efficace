// import { Prisma } from "@prisma/client";
import { Router } from "express";
import prisma from '../prisma';

const donationRouter = Router();

// display all donations
donationRouter.get("/test", async (req: any, res: any) => {
    res.status(200).json('endpoint hath been hit');
});

// display all donations
donationRouter.get("/", async (req: any, res: any) => {
    try {
        const allDonations = await prisma.donation.findMany();
        console.log(allDonations);
        res.status(200).json(allDonations);
    } catch (e) {
        console.error("Error fetching donations: ", e);
        res.status(500).send("An error occurred while fetching donations.");
    }
});


export default donationRouter;