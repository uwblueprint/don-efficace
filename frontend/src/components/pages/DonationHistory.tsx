import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Flex, Text } from "@chakra-ui/react";
import DonationsTable from "../common/DonationsTable";
import FilterDropdown from "../common/FilterDropdown";
import ImpactPerCause from "../common/ImpactPerCause";
import ReceiptDropdown from "../common/ReceiptDropdown";

interface Donation {
  Cause: string;
  Date: Date
  Amount: number;
  Frequency: string;
  TransactionID: string;
}

interface Filter {
  causes: string[];
  frequencies: string[];
  years: string[];
}

const DonationHistory = (): React.ReactElement => {
  const [donationsData, setDonationsData] = useState<any[]>([]);
  const [filter, setFilter] = useState<Filter>({
    causes: [],
    frequencies: [],
    years: []
  });


  // Updates selectedYears state when it is selected
  const [selectedYears, setSelectedYears] = useState<{ value: string; label: string }[]>([]);
  const handleYearsChange = (selected: { value: string; label: string }[]) => {
    setSelectedYears(selected);
  };

  async function getUserDonations(userId: string) {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/donations/${userId}`);

      // Transforms fetched data to match table.
      const transformedData = response.data.map((donation: any) => ({
        Cause: donation.cause.name,
        Date: new Date(donation.donation_date),
        Amount: donation.amount,
        Frequency: donation.is_recurring,
        TransactionID: donation.payment_id,
      }));

      // Sets transformed data to donationsData.
      setDonationsData(transformedData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const userId = "cly144mky0000bntg3dupxlx1";
    getUserDonations(userId);
  }, []);

  // Functions to generate dropdown menu options. Creates a Set to remove duplicates and returns as array of objects.
  const getUniqueOptions = (key: string) => {
    const uniqueValues = Array.from(new Set(donationsData.map(item => item[key])));
    return uniqueValues.map(value => ({ label: value, value }));
  };

  const getUniqueYearOptions = (key: string) => {
    const uniqueYears = Array.from(new Set(donationsData.map(item => new Date(item[key]).getFullYear())));
    return uniqueYears.map(year => ({ label: year.toString(), value: year.toString() }));
  };


  // Generates filter options from data above.
  const causeOptions = getUniqueOptions('Cause');
  const frequencyOptions = getUniqueOptions('Frequency');
  const yearOptions = getUniqueYearOptions('Date');

  // Handles changes to filter dropdown.
  const handleFilterChange = (type: keyof Filter) => (selected: { value: string; label: string }[] | { value: string; label: string } | null) => {
    const selectedValues = Array.isArray(selected) ? selected.map(option => option.value) : selected?.value;
    setFilter(prev => ({ ...prev, [type]: selectedValues }));
  };

  // Maps string values back to objects for the selectedOptions prop.
  const mapSelectedOptions = (
    selectedValues: string[],
    options: { label: string; value: string }[],
  ) => {
    return options.filter((option) => selectedValues.includes(option.value));
  };

  const resetFilters = () => {
    setFilter({
      causes: [],
      frequencies: [],
      years: [],
    });
  };

  return (
    <div id="donationHistory">
      <h1 id="tableTitle">Your Donations</h1>
      {/* // We need these next two comments to prevent "Expression produces a union type that is too complex to represent."
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore 
            */}
      <Flex direction="row" justify="space-between" padding="16px">
        <Box width="25%">
          <FilterDropdown
            label="Cause"
            options={causeOptions}
            selectedOptions={mapSelectedOptions(filter.causes, causeOptions)}
            onChange={handleFilterChange('causes')}
            isMulti
          />
        </Box>
        <Box width="30%">
          <FilterDropdown
            label="Donation Frequency"
            options={frequencyOptions}
            selectedOptions={mapSelectedOptions(filter.frequencies, frequencyOptions)}
            onChange={handleFilterChange('frequencies')}
            isMulti={false}
          />
        </Box>
        <Box width="25%">
          <FilterDropdown
            label="Donation Year"
            options={yearOptions}
            selectedOptions={mapSelectedOptions(filter.years, yearOptions)}
            onChange={handleFilterChange('years')}
            isMulti={false}
          />
        </Box>
        <Box width="10%" alignSelf="flex-end">
          <Text cursor="pointer" color="#837974" _hover={{ color: "blue.500" }} onClick={resetFilters}>Reset Filters</Text>
        </Box>
      </Flex>
      <DonationsTable filter={filter} data={donationsData} />

      {/* Temporary place to put ImpactPerCause component, below the dashboard */}
      <ImpactPerCause />
      <ReceiptDropdown
          selectedYears={selectedYears}
          onYearsChange={handleYearsChange}
        />
    </div>

  );
};

export default DonationHistory;
