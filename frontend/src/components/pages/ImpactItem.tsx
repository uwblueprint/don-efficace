import React from "react";
import { Box, Text, Center } from "@chakra-ui/react";

interface ItemData {
  item_id: number;
  item_name: string;
  total_impact: number;
}

const ImpactItem: React.FC<ItemData> = ({ item_id, item_name, total_impact }) => {
  const numDigits = total_impact.toString().length;
  const width = `${65 + numDigits * 15}px`;

  return (
    <Box
      color="#4D4D4D"
      borderWidth="1px"
      borderRadius="lg"
      padding="2"
      margin="3"
      key={item_id}
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
            {/* Text displaying the total impact */}
            <Text
              fontWeight="bold"
              fontSize="4xl"
              color="#A5154C"
            >
              {total_impact}
            </Text>
          </Center>
        </Box>
        {/* Text displaying the item name */}
        <Text
          fontSize="sm"
          fontWeight="bold"
          mt={2}
          color="black"
          textAlign="center"
        >
          {item_name}
        </Text>
      </Center>
    </Box>
  );
};

export default ImpactItem;
