import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text, Heading, useColorModeValue } from '@chakra-ui/react';

interface TotalValueDonatedProps {
  title: string;
  totalValueDonated: number;
  text: string;
}

const TotalValueDonatedBox: React.FC<TotalValueDonatedProps> = ({ title, totalValueDonated, text }) => {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow="sm"
      width="25%"
    >
      <Heading as="h3" size="sm" mb={2} textAlign="center" margin="0px" color={useColorModeValue('gray.800', 'white')}>
        {title}
      </Heading>

      <Flex align="center" justify="space-between" borderRadius="md" p={2} mb={2} padding="20px 50px" margin="0px">
        <Text fontSize="2xl" fontWeight="bold" mb={2} margin="0px" color={useColorModeValue('gray.800', 'white')}>
          ${totalValueDonated}
        </Text>
        <Text fontSize="sm" width="40%" margin="0px" color={useColorModeValue('gray.600', 'gray.200')}>
          {text}
        </Text>
      </Flex>
    </Box>
  );
};

TotalValueDonatedBox.propTypes = {
  title: PropTypes.string.isRequired,
  totalValueDonated: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default TotalValueDonatedBox;
