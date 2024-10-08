import { Router } from "express";
import PaymentService from "../services/implementations/paymentService";
import IPaymentService from "../services/interfaces/paymentService";

const paymentRouter: Router = Router();
const paymentService: IPaymentService = new PaymentService();

paymentRouter.post("/", (req, res) => {
    try {
        paymentService.createPayment(req.body)
    } catch (err) {
        console.error(err)
    }
    res.send("Payment successful!");
});

paymentRouter.put("/", (req, res) => {
    const { id, payload } = req.body
    try {
        paymentService.updatePayment(id, payload)
    } catch (err) {
        console.error(err)
    }

    res.send("Payment updated!");
});