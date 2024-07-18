import React, { useState, FormEvent } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutForm: React.FC = () => {
  const stripe = useStripe(); 
  const elements = useElements();
  const [amount, setAmount] = useState<string>(''); 

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    console.log('amount', amount);

    const response = await axios.get('http://localhost:5000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: 'cly144mky0000bntg3dupxlx1', amount: Number(amount), causeId: 1 }),
    });

    console.log('response', response);

    const data = await response.json();
    const sessionId: string = data.id;

    if (stripe) {
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
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
      <button type="submit" disabled={!stripe || !elements}>Pay</button>
    </form>
  );
};

const StripeCheckout: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripeCheckout;
