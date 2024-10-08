import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import countries from "../../constants/countries";

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
  };

  return (
    <Box color="#645B56" width="50%">
      <form onSubmit={handleSubmit}>
        {/*     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore */}
        <Box margin="0px 0px 20px 0px">
          <Heading as="h2" textAlign="left">
            Personal Details
          </Heading>
        </Box>
        <Box display="flex" mb="20px">
          <FormControl id="firstName" mr="10px">
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              value={firstName}
              /*     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore */
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl id="lastName" ml="10px">
            <FormLabel>Last Name</FormLabel>
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
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="streetAddress" mb="20px">
          <FormLabel>Street Address</FormLabel>
          <Input
            type="text"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </FormControl>
        <FormControl id="city" mb="20px">
          <FormLabel>City</FormLabel>
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </FormControl>
        <Box display="flex" mb="20px">
          <FormControl id="country" mr="10px">
            <FormLabel>Country</FormLabel>
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
            <FormLabel>Postal Code</FormLabel>
            <Input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </FormControl>
        </Box>
        <Button mt={4} colorScheme="teal" type="submit">
          {"Payment Details >"}
        </Button>
      </form>
    </Box>
  );
};

export default PersonalDetails;
