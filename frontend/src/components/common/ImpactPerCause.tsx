import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Button, Center, Circle } from "@chakra-ui/react";

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

  const handlePrevious = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setPageIndex((prev) => (prev < causes.length - 1 ? prev + 1 : prev));
  };

  async function fetchImpactData(userId: string) {
    try {
      const response = await fetch(`http://localhost:5001/impacts/${userId}`);
      const data = await response.json();
      // response.cause_id, response.cause_name, response.items[...item_id, item_name, total_impact, ...] ...
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching impact data,", error);
      return null;
    }
  }

  useEffect(() => {
    const userId = "cly144mky0000bntg3dupxlx1"; // hardcoded in temporarily
    fetchImpactData(userId).then((data) => {
      setCauses(data);
    });
  }, []);

  return (
    <Box
      maxW="xl"
      mx="auto"
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Text
        fontSize="2xl"
        mb={4}
        textAlign="center"
        fontWeight="bold"
        color="#4D4D4D"
      >
        {causes.length > 0
          ? `Total Impact For ${causes[pageIndex].cause_name}`
          : "Loading Causes..."}
      </Text>
      {causes.length > 0 && (
        <Flex justifyContent="space-evenly" alignItems="center">
          <Button onClick={handlePrevious} disabled={pageIndex === 0}>
            {"<"}
          </Button>
          <Box>
            <Flex padding="5">
              {causes[pageIndex].items.map((item) => (
                <Box color="#4D4D4D" borderWidth="1px" borderRadius="lg" padding="2" margin="3">
                <Center flexDirection="column" m={2} key={item.item_id}>
                  <Circle
                    size="80px"
                    bgColor="#EFDFE4"
                    borderWidth="1px"
                    borderColor="#A5154C"
                    color="black"
                  >
                    <Text fontWeight="bold" fontSize="3xl" color="#A5154C">
                      {item.total_impact}
                    </Text>
                  </Circle>
                  <Text mt={2}>{item.item_name}</Text>
                </Center>
                </Box>
              ))}
            </Flex>
          </Box>
          <Button
            onClick={handleNext}
            disabled={pageIndex === causes.length - 1}
          >
            {">"}
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default ImpactPerCause;
