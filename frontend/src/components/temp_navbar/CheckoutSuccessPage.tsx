import React from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const CheckoutSuccessPage: React.FC = () => {
  const borderColor = useColorModeValue("#e6c5d1", "#e6c5d1");
  const textColor = useColorModeValue("#333333", "#333333");

  return (
    <Box
      maxWidth="md"
      margin="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <VStack spacing={6} align="center">
        <CheckCircleIcon boxSize="50px" color="green.500" />
        <Heading as="h2" size="xl" textAlign="center" color={textColor}>
          Payment Successful!
        </Heading>
        <Text fontSize="lg" textAlign="center" color={textColor}>
          Thank you for your donation. Your transaction has been completed successfully.
        </Text>
        <Text fontSize="md" textAlign="center" color={textColor}>
          A confirmation email has been sent to your registered email address.
        </Text>
        <Button
          as={Link}
          to="/"
          bgColor="#fadbe7"
          size="lg"
          mt={4}
          bg="#e6c5d1"
          color={textColor}
          _hover={{ bg: "#d1afc0" }}
        >
          Return to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default CheckoutSuccessPage;