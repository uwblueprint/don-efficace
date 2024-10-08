import React, { useState } from "react";
import Select from "react-select";
import {
  FormControl,
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
  const [receiptYear, setReceiptYear] = useState([]);
  const currentYear = new Date().getFullYear();

  // Example years for protoyping purposes (currently takes last four years)
  // Have to fetch year data from the user's donation history
  const years = Array.from({ length: 4 }, (_, i) => {
    const year = (currentYear - i).toString();
    return { value: year, label: year };
  });

  // Change the year of the receipt based on the user's selection
  const handleYearsChange = (selected: any) => {
    setReceiptYear(selected.map((item: any) => item.label));
    onYearsChange(selected || []);
  };

  // Call download endpoint
  async function downloadReceipt() {
    console.log(receiptYear)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/receipt`, // Adjust endpoint as needed
        { years: receiptYear } // Send the years in the request body
      );
      // TODO: And then we do something with this endpoint
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box style={{ marginTop: "2%" }}>
      <hr style={{ padding: "10px" }} />
      
      <Heading style={{ color: "#645B56", fontSize: "20px" }}>
        <b style={{ marginBottom: "10%" }}>Export Annual Tax Receipts</b>
      </Heading>

      {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore  */}
      <HStack width={800} marginTop={5}>
        <FormControl>
          <Select
            isMulti
            options={years}
            value={selectedYears}
            onChange={handleYearsChange}
            placeholder="Select a year"
            styles={{
              control: (provided) => ({
                ...provided,
                padding: "10px",
              }),
            }}
          />
        </FormControl>

        <Button
          variant="outline"
          colorScheme="pink"
          borderColor="#A5154C"
          borderRadius="5px"
          onClick={downloadReceipt}
          style={{
            paddingLeft: "50px",
            paddingRight: "50px",
            paddingTop: "28px",
            paddingBottom: "28px",
          }}
        >
          Download Receipt
        </Button>
      </HStack>
    </Box>
  );
};

export default ReceiptDropdown;
