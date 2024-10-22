import React, { useState } from "react";
import {
  Box,
  Image,
  Heading,
  FormControl,
  FormLabel,
  Checkbox,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import StripeCheckout from "../pages/StripeCheckout";
import SelectCauseCheckbox from "./SelectCauseCheckbox";
import heroBanner from "../../assets/hero-banner.jpeg";
import ImpactPerCause from "./ImpactPerCause";

type Cause = "health" | "education" | "animal";

const DonationForm: React.FC = () => {
  const [selectedCauses, setSelectedCauses] = useState({
    health: false,
    education: false,
    animal: false,
  });

  const handleCheckboxChange = (cause: Cause) => {
    setSelectedCauses((prev) => ({
      ...prev,
      [cause]: !prev[cause],
    }));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      width="100%"
    >
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        width="100%"
      >
        {/* Hero Banner */}
        <Box width="100%" height="500px" position="relative" overflow="hidden">
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

      <Box padding="5%">
        <Box margin="0px 0px 20px 0px">
          <Heading as="h2" textAlign="left">
            Donation Details
          </Heading>
        </Box>

        <Box width="80%" display="flex" marginLeft="5px">
          <FormControl id="cause" mb={4}>
            <FormLabel
              fontSize="14pt"
              fontWeight="bold"
              display="flex"
              alignItems="center"
              margin="0px 0px 10px 0px"
            >
              Select Cause
              <Icon
                as={InfoIcon}
                color="black.500"
                title="More information about causes"
                margin="0px 0px 3px 8px"
              />
            </FormLabel>

            <HStack display="flex" justifyContent="left" alignItems="center">
              <SelectCauseCheckbox
                label="Health & Solidarity Fund"
                onChange={(checked) => console.log(checked)}
              />
              <SelectCauseCheckbox
                label="Education & Research Fund"
                onChange={(checked) => console.log(checked)}
              />
              <SelectCauseCheckbox
                label="Animal Welfare & Fund"
                onChange={(checked) => console.log(checked)}
              />
            </HStack>
          </FormControl>
        </Box>

        <Box>
          <Text
            fontSize="14pt"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            margin="20px 0px 10px 0px"
          >
            Your Impact
          </Text>

          <ImpactPerCause />
        </Box>
      </Box>

      <StripeCheckout />
    </Box>
  );
};

export default DonationForm;
