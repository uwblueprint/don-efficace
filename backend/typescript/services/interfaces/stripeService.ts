import { Response } from "express";

export interface IStripeService {
    evaluateCheckout (sig: string | string[], body: any, res: Response): Promise<void>;
}