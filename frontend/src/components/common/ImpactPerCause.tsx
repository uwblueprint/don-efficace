import React, { useState } from "react";
import { Box, Text, Flex, Button, Center, Circle } from "@chakra-ui/react";

interface ImpactData {
  id: number;
  label: string;
  value: number;
}

// This data will be replaced by a series of backend calls to fetch impact data

// fetch cause -> donation, NPO
// donation -> item

// impact per cause is measured as item.impact_ratio : item.name

const impactItems: ImpactData[] = [
  { id: 1, label: "Trees Planted", value: 5 },
  { id: 2, label: "Beehives", value: 100 },
  { id: 3, label: "Beaches Cleaned", value: 10 },
];

const ImpactPerCause: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const handlePrevious = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setPageIndex((prev) => (prev < impactItems.length - 1 ? prev + 1 : prev));
  };

  async function fetchImpactData() {
    try {
      const response = await fetch("http://localhost:5000/impact");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box
      maxW="xl"
      mx="auto"
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      
      <Text fontSize="2xl" mb={4} textAlign="center" fontWeight="bold" color="#4D4D4D">
        Total Impact Per Cause
      </Text>
      <Flex justifyContent="space-evenly" alignItems="center">
        <Button onClick={handlePrevious} disabled={pageIndex === 0}>
          {"<"}
        </Button>
        <Box borderWidth="1px" borderColor="#E0DCDA" padding="5" borderRadius="md">
          <Center flexDirection="column">
            <Circle size="80px" bgColor="#EFDFE4" borderWidth="1px" borderColor="#A5154C" color="black">
              <Text fontWeight="bold" fontSize="5xl" color="#A5154C">{impactItems[pageIndex].value}</Text>
            </Circle>
            <Text mt={2}>{impactItems[pageIndex].label}</Text>
          </Center>
        </Box>
        {/* <Box borderWidth="1px" borderColor="#E0DCDA" padding="5" borderRadius="md">
          <Center flexDirection="column">
            <Circle size="100px" bgColor="#EFDFE4" borderWidth="1px" borderColor="#A5154C" color="black">
              <Text fontWeight="bold" fontSize="5xl" color="#A5154C">{impactItems[pageIndex + 1].value}</Text>
            </Circle>
            <Text mt={2}>{impactItems[pageIndex + 1].label}</Text>
          </Center>
        </Box>
        <Box borderWidth="1px" borderColor="#E0DCDA" padding="5" borderRadius="md">
          <Center flexDirection="column">
            <Circle size="100px" bgColor="#EFDFE4" borderWidth="1px" borderColor="#A5154C" color="black">
              <Text fontWeight="bold" fontSize="5xl" color="#A5154C">{impactItems[pageIndex + 2].value}</Text>
            </Circle>
            <Text mt={2}>{impactItems[pageIndex + 2].label}</Text>
          </Center>
        </Box> */}
        <Button
          onClick={handleNext}
          disabled={pageIndex === impactItems.length - 1}
        >
          {">"}
        </Button>
      </Flex>
      <Flex mt={4} justifyContent="center">
        {impactItems.map((item, index) => (
          <Circle size="10px" bg={pageIndex === index ? "#A5154C" : "#E0DCDA"} mx={1} key={item.id} />
        ))}
      </Flex>
    </Box>
  );
};

export default ImpactPerCause;
