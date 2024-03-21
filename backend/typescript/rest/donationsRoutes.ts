// import { Prisma } from "@prisma/client";
import { Router } from "express";
import prisma from '../prisma';

const donationRouter = Router();

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

// display all donations made by a user
donationRouter.get("/:id", async (req: any, res: any) => {
    const id = req.params.id;

    try {
        const userDonation = await prisma.donation.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.status(200).json(userDonation);
    } catch (e) {
        console.error(`Error fetching donation for user ${id}: `, e);
        res.status(500).send("An error occurred while fetching donations.");
    }
});

// Each donation has 1 cause associated with it, the donation from user will be split before calling this route.
donationRouter.post("/give", async (req: any, res: any) => {
    try {
        const { user_id, amount, donation_date, cause_id, is_recurring, confirmation_email_sent } = req.body;

        const newDonation = await prisma.donation.create({
            data: {
                user: { connect: { id: user_id } },
                amount,
                donation_date: new Date(donation_date),
                cause: { connect: { id: cause_id } },
                is_recurring,
                confirmation_email_sent
            },
        });
        res.status(200).json(newDonation);
    } catch (e) {
        console.error("Error creating new donation: ", e);
        res.status(500).send("An error occurred while creating donation.");
    }
})

export default donationRouter;