import React from "react";
import Select from "react-select";
import {
  FormControl,
  FormLabel,
  Button,
  Box,
  Heading,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";

interface ReceiptDropdownProps {
  selectedYears: { value: string; label: string }[];
  onYearsChange: (selectedYears: { value: string; label: string }[]) => void;
}

const ReceiptDropdown: React.FC<ReceiptDropdownProps> = ({
  selectedYears,
  onYearsChange,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => {
    const year = (currentYear - i).toString();
    return { value: year, label: year };
  });

  const handleYearsChange = (selected: any) => {
    onYearsChange(selected || []);
  };

  async function downloadReceipt() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/receipts/`,
      );
      // and then we do something with this endpoint.
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box>
      <h2 style={{ color: '#645B56', fontSize: '20px' }}>
        <b>Export Annual Tax Receipts</b>
      </h2>
      {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore  */}
      <HStack width={800}>
        <FormControl>
          <Select
            isMulti
            options={years}
            value={selectedYears}
            onChange={handleYearsChange}
            placeholder="Select years"
            styles={{
              control: (provided) => ({
                ...provided,
              }),
              multiValue: (provided) => ({
                ...provided,
                backgroundColor: "#F9E6E6", // Light pink background for selected items
              }),
              multiValueLabel: (provided) => ({
                ...provided,
                color: "#C41E3A", // Dark red text for selected items
              }),
              multiValueRemove: (provided) => ({
                ...provided,
                color: "#C41E3A",
                ":hover": {
                  backgroundColor: "#C41E3A",
                  color: "white",
                },
              }),
            }}
          />
        </FormControl>

        <Button
          variant="outline"
          colorScheme="pink"
          borderColor="#A5154C"
          borderRadius="5px"
          color="#A5154C"
        >
          Download Receipts
        </Button>
      </HStack>
    </Box>
  );
};

export default ReceiptDropdown;
