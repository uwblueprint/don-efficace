

/**
 * Interface for the PaymentDTO class
 */
// export interface PaymentDTO {
//     id: number;
//     stripePaymentId: string;
//     creationDate: string;
//     updateDate: string;
//     // donation?: number;
//     amount: number;
//     currency: string;
//     status: string;
// }

/**
 * Interface for the PaymentService class
 */
interface IPaymentService {
    /**
     * retrieve the SimpleEntity with the given id
     * @param id SimpleEntity id
     * @returns requested SimpleEntity
     * @throws Error if retrieval fails
     */
    createPayment(payload: any): Promise<any>;

    updatePayment(paymentId: number, payload: any): Promise<any>;
}

export default IPaymentService;