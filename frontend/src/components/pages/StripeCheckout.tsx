import React, { useState, FormEvent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const createCheckoutSession = async (
    userId: string,
    sessionAmount: number,
    causeId: number
  ) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/stripe/create-checkout-session`,
        {
          user_id: userId,
          amount: sessionAmount,
          cause_id: causeId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.url;
    } catch (error) {
      console.error("Error creating checkout session", error);
      throw error;
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const url = await createCheckoutSession(
        "cly144mky0000bntg3dupxlx1",
        Number(amount) * 100,
        1
      );
      window.location.href = "http://localhost:3000/checkout-success";
    } catch (error) {
      console.error("Failed to create checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      maxWidth="md"
      margin="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      borderColor={borderColor}
      bgColor={bgColor}
      boxShadow="lg"
    >
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg" textAlign="center" mb={4}>
          Checkout
        </Heading>
        <FormControl isRequired>
          <FormLabel htmlFor="amount">Amount (USD)</FormLabel>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount((e.target.value))}
            min={0}
            step={0.01}
            placeholder="Enter amount"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="card-element">Card Details</FormLabel>
          <Box
            borderWidth={1}
            borderRadius="md"
            p={3}
            borderColor={borderColor}
          >
            <CardElement id="card-element" />
          </Box>
        </FormControl>
        <Button
          type="submit"
          bgColor="#fadbe7"
          isLoading={loading}
          loadingText="Processing..."
          isDisabled={!stripe || !elements}
          width="full"
          mt={4}
        >
          Checkout
        </Button>
      </VStack>
    </Box>
  );
};

const StripeCheckout: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripeCheckout;