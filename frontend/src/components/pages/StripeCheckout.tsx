import React, { useState, FormEvent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string,
);

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    console.log("amount", amount);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/create-checkout-session`,
        {
          userId: "cly144mky0000bntg3dupxlx1",
          amount: Number(amount),
          causeId: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("response", response);

      const { id: sessionId } = response.data;
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId,
        });

        if (error) {
          console.error("Error redirecting to checkout:", error);
        }
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <CardElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
    </form>
  );
};

const StripeCheckout: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripeCheckout;
