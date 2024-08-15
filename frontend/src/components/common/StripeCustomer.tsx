import React, { useState } from "react";
import dotenv from "dotenv";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

dotenv.config();

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);
const stripeCreateCustomerRoute = process.env.REACT_APP_STRIPE_CREATE_CUSTOMER_ROUTE as string;

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
        const response = await axios.post(
            stripeCreateCustomerRoute,
          {
            name,
            email,
            paymentMethod: paymentMethod?.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const customer = response.data;
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
