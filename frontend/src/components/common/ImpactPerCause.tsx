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
            {causes[pageIndex].items.map((item) => {
                const numDigits = item.total_impact.toString().length;
                const width = `40 + ${numDigits * 40}px`;
                return (
                  <Box
                    color="#4D4D4D"
                    borderWidth="1px"
                    borderRadius="lg"
                    padding="2"
                    margin="3"
                    key={item.item_id}
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
                        <Center flexDirection="column" m={4}>
                          <Text fontWeight="bold" fontSize="3xl" color="#A5154C">
                            {item.total_impact}
                          </Text>
                        </Center>
                      </Box>
                      <Text mt={2}>{item.item_name}</Text>
                    </Center>
                  </Box>
                );
              })}
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
      <Flex mt={4} justifyContent="center">
        {causes.map((item, index) => (
          <Circle size="10px" mx={1} bg={pageIndex === index ? "#A5154C" : "#E0DCDA"} key={item.cause_id} />
        ))}
      </Flex>
    </Box>
  );
};

export default ImpactPerCause;
