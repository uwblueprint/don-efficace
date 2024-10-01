import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControl, FormLabel, Input, Heading, Text } from '@chakra-ui/react'; 
import Select from 'react-select';

// Custom styles for the Select component to have a red border
const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderColor: '#A5154C', // Red border color
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#A5154C',
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#f7e6ef' : '#fff', // Light red for selected options
    color: '#000',
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#f7e6ef', // Light red background for selected options
    border: '1px solid #A5154C', // Red border for selected items
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: '#A5154C', // Red text for selected items
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: '#A5154C',
    ':hover': {
      backgroundColor: '#A5154C',
      color: 'white',
    },
  }),
};

const DonationForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [cause, setCause] = useState<string[]>([]);
  const [isRecurring, setIsRecurring] = useState<boolean>(false);

  const handleSelectChange = (selectedOptions: any) => {
    setCause(selectedOptions ? selectedOptions.map((option: any) => option.value) : []);
  };

  const causeOptions = [
    { value: 'health', label: 'Health & Solidarity Fund' },
    { value: 'education', label: 'Education & Research Fund' },
    { value: 'animal', label: 'Animal Welfare & Environment Fund' },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ amount, cause, isRecurring });
    // Process form data (e.g., send it to the backend)
  };

  return (
    <>
      {/* Hero Banner Section */}
      <Box
        position="relative"
        height="400px"
        backgroundImage="url('https://source.unsplash.com/random/1600x900')" // Placeholder image
        backgroundPosition="center"
        backgroundSize="cover"
      >
        {/* Translucent Red Overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundColor="rgba(165, 21, 76, 0.6)" // Red with transparency
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="4xl" color="white" textAlign="center">
            Je veux m&apos;engager par mes dons.
          </Text>
        </Box>
      </Box>

      {/* Donation Details Form */}
      <Box p={8}>
        <Heading as="h2" size="lg" mb={6}>
          Donation Details
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel fontSize="lg">
              Select Cause <span aria-label="info" role="img">ℹ️</span>
            </FormLabel>
            <Select
              isMulti
              name="causes"
              options={causeOptions}
              onChange={handleSelectChange}
              styles={customStyles} // Apply custom styles
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Donation Amount</FormLabel>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              required
            />
          </FormControl>

          <FormControl mb={4}>
            <Checkbox
              isChecked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
            >
              Recurring Donation
            </Checkbox>
          </FormControl>

          <Button colorScheme="red" type="submit">
            Proceed to Payment
          </Button>
        </form>
      </Box>
    </>
  );
};

export default DonationForm;
