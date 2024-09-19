import IPaymentService from "../interfaces/paymentService";
import prisma from "../../prisma";

class PaymentService implements IPaymentService {
    async createPayment(payload: any): Promise<any> {
        try {
            const newPayment = prisma.payment.create({
                data: payload
            })

            return newPayment;
        } catch (error) {
            console.error(error)
        }
        
    }
    
    async updatePayment(paymentId: number, payload: any): Promise<any> {

        try {
            const updatedPayment = prisma.payment.update({
                where: {
                    id: paymentId,
                  },
                  data: payload
            })
    
            return updatedPayment;
        } catch (error) {
            console.error(error)
        }
    }
}

export default PaymentService;