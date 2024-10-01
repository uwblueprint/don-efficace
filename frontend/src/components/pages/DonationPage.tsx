import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Button, Center, Circle } from "@chakra-ui/react";
import DonationImpactMetric from "./ImpactItem";

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

const ITEMS_PER_PAGE = 3; // Define how many items to show per page

const Donate: React.FC = () => {
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

  const currentItems = causes.length > 0 
    ? causes[pageIndex].items.slice(0, ITEMS_PER_PAGE) 
    : [];

  return (
    <>
    <Text>Your Impact</Text>
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
              <DonationImpactMetric
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
    </>
  )
};

export default Donate;
