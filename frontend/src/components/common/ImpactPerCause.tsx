import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Button, Center, Circle } from "@chakra-ui/react";
// import CircleCard from "../pages/CircleCard";

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
              {causes[pageIndex].items.map((item) => {
                const numDigits = item.total_impact.toString().length;
                const width = `${65 + numDigits * 15}px`;
                return (
                  <Box
                    color="#4D4D4D"
                    borderWidth="1px"
                    borderRadius="lg"
                    padding="2"
                    margin="3"
                    key={item.item_id}
                    borderColor="#E0DCDA"
                  >
                    <Center flexDirection="column" m={2}>
                      <Box
                        height="80px"
                        width={width}
                        bgColor="#EFDFE4"
                        borderWidth="1px"
                        borderColor="#A5154C"
                        color="black"
                        borderRadius="full"
                      >
                        <Center flexDirection="column" m={3}>
                          <Text
                            fontWeight="bold"
                            fontSize="4xl"
                            color="#A5154C"
                          >
                            {item.total_impact}
                          </Text>
                        </Center>
                      </Box>
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        mt={2}
                        color="black"
                        textAlign="center"
                      >
                        {item.item_name}
                      </Text>
                    </Center>
                  </Box>
                );
              })}
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
        {/* {causes[pageIndex].items.map((item) => (
          <CircleCard key={item.item_id} item={item} />
        ))} */}
      </Flex>
    </Box>
  );
};

export default ImpactPerCause;
