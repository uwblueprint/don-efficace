import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Button, Center, Circle } from "@chakra-ui/react";
import ImpactItem from "../pages/ImpactItem";

interface ItemData {
  item_id: number;
  item_name: string;
  total_impact: number;
}

interface CauseData {
  cause_id: number;
  cause_name: string;
  items: ItemData[];
}

const ImpactPerCause: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [causes, setCauses] = useState<CauseData[]>([]);

  // Buttons to move between different causes/pages
  const handlePrevious = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setPageIndex((prev) => (prev < causes.length - 1 ? prev + 1 : prev));
  };

  // As of right now, impact is fetched from this link. In the future, this will be replaced by authContext.
  // Change to localhost:5000 and modify the userId below based on the data entered in Prisma
  async function fetchImpactData(userId: string) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/impacts/${userId}`,
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching impact data,", error);
      return null;
    }
  }

  useEffect(() => {
    // Hardcoded in for testing purposes, change depending on what your user
    const userId = "cly144mky0000bntg3dupxlx1";
    fetchImpactData(userId).then((data) => {
      setCauses(data);
    });
  }, []);

  return (
    <Box
      maxW="40rem"
      mx="auto"
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      borderColor="#E0DCDA"
    >
      {/* Header text displaying the cause name or loading message */}
      <Text
        fontSize="2xl"
        mt={3}
        mb={0}
        textAlign="center"
        fontWeight="bold"
        color="#4D4D4D"
      >
        {causes.length > 0
          ? `Total Impact For ${causes[pageIndex].cause_name}`
          : "Loading Causes..."}
      </Text>
      {/* Content section to display items and navigation buttons */}
      {causes.length > 0 && (
        <Flex justifyContent="space-evenly" alignItems="center">
          {/* Previous button */}
          <Button
            onClick={handlePrevious}
            disabled={pageIndex === 0}
            background="transparent"
          >
            ❮
          </Button>
          <Box>
            <Flex padding="5">
              {causes[pageIndex].items.map((item) => (
                <ImpactItem
                  key={item.item_id}
                  item_id={item.item_id}
                  item_name={item.item_name}
                  total_impact={item.total_impact}
                />
              ))}
            </Flex>
          </Box>
          {/* Next button */}
          <Button
            onClick={handleNext}
            disabled={pageIndex === causes.length - 1}
            backgroundColor="transparent"
          >
            ❯
          </Button>
        </Flex>
      )}
      {/* Circles on the bottom to indicate current page */}
      <Flex mt={0} mb={3} justifyContent="center">
        {causes.map((item, index) => (
          <Circle
            size="20px"
            mx={2}
            bg={pageIndex === index ? "#A5154C" : "#E0DCDA"}
            key={item.cause_id}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default ImpactPerCause;
