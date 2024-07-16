import React, { useState } from "react";
import dotenv from "dotenv";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

dotenv.config();

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);

const CreateCustomerForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("CardElement not found");
      return;
    }

    const {
      error: paymentMethodError,
      paymentMethod,
    } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name,
      },
    });

    console.log("Payment Method object:", paymentMethod);

    if (paymentMethodError) {
      console.error("Error creating payment method:", paymentMethodError);
    } else {
      try {
        const response = await fetch(
          "http://localhost:5001/stripe/create-customer",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              paymentMethod: paymentMethod?.id,
            }),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to create customer");
        }

        const customer = await response.json();
        console.log("Customer created:", customer);
      } catch (error) {
        console.error("Error creating customer:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <div>
        <div>Card Details</div>
        <CardElement id="card-element" />
      </div>
      <button type="submit" disabled={!stripe}>
        Create Customer
      </button>
    </form>
  );
};

const CreateCustomer: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CreateCustomerForm />
  </Elements>
);

export default CreateCustomer;
