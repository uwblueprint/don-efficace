import React, { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Button,
  Select,
} from "@chakra-ui/react";
import countries from "../../constants/countries";
import heroBanner from "../../assets/hero-banner.jpeg";
import Input from "../common/Input";

const PersonalDetails: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const address = `${streetAddress}, ${city}, ${postalCode}, ${country}`;

    const formData = {
      firstName,
      lastName,
      email,
      address,
    };

    try {
      // TO DO: Create user if the provided email does not exist within our database

      // TO DO: redirect to the next step in the form
      console.log("Form successfully submitted");
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <Box color="#645B56" width="80%" mx="auto">
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        width="100%"
      >
        {/* Hero Banner */}
        <Box width="100%" height="350px" position="relative" overflow="hidden">
          {/*     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore */}
          <Image
            position="absolute"
            top="0"
            left="0"
            src={heroBanner}
            zIndex="1"
            width="100%"
            height="100%"
            objectFit="cover" // This ensures the image maintains its aspect ratio
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            backgroundColor="rgba(166, 22, 75, 0.5)"
            zIndex="2"
            width="100%"
            height="100%"
          >
            &nbsp;
          </Box>
          <Heading
            position="absolute"
            top="0"
            left="0"
            color="#FFF"
            fontSize="36pt"
            textAlign="center"
            zIndex="3"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            Je veux m&apos;engager par mes dons.
          </Heading>
        </Box>
      </Box>

      {/* TO DO: insert progress bar for donation form here */}

      <form onSubmit={handleSubmit}>
        <Box width="50%">
          {/*     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore */}
          <Box margin="50px 0px 20px 0px">
            <Heading as="h2" textAlign="left">
              Personal Details
            </Heading>
          </Box>
          <Box display="flex" mb="20px">
            <FormControl id="firstName" mr="10px">
              <FormLabel fontWeight="bold">First Name</FormLabel>
              <Input
                type="text"
                value={firstName}
                /*     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore */
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
            <FormControl id="lastName" ml="10px">
              <FormLabel fontWeight="bold">Last Name</FormLabel>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
          </Box>
          {/*     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore */}
          <FormControl id="email" mb="20px">
            <FormLabel fontWeight="bold">Email Address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="streetAddress" mb="20px">
            <FormLabel fontWeight="bold">Street Address</FormLabel>
            <Input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </FormControl>
          <FormControl id="city" mb="20px">
            <FormLabel fontWeight="bold">City</FormLabel>
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FormControl>
          <Box display="flex" mb="20px">
            <FormControl id="country" mr="10px">
              <FormLabel fontWeight="bold">Country</FormLabel>
              <Select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Select country"
              >
                {/*     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore */}
                {countries.map((cty) => (
                  <option key={cty.code} value={cty.name}>
                    {cty.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="postalCode" ml="10px">
              <FormLabel fontWeight="bold">Postal Code</FormLabel>
              <Input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </FormControl>
          </Box>
        </Box>
        {/*     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore */}
        <Flex my={12} justify="space-between">
          <Button color="#A5154C" backgroundColor="white" borderColor="#A5154C" borderWidth="1px">
            {"< Donation Details"}
          </Button>
          <Button color="white" backgroundColor="#A5154C" type="submit">
            {"Payment Details >"}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default PersonalDetails;
