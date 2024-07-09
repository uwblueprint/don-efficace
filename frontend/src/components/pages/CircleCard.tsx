import React from "react";
import { Box, Text, Center } from "@chakra-ui/react";

interface CircleCardProps {
  item: {
    item_id: number;
    item_name: string;
    total_impact: number;
  };
}

const CircleCard: React.FC<CircleCardProps> = ({ item }) => {
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
        <Text fontSize="sm" fontWeight="bold" mt={2} color="black" textAlign="center">{item.item_name}</Text>
      </Center>
    </Box>
  );
};

export default CircleCard;
