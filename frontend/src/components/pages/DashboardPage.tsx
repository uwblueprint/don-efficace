import React, { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import DonationsTable from "../common/DonationsTable";
import FilterDropdown from "../common/FilterDropdown";
import donationsData from '../../constants/donationsDataSample'; // For testing purposes

// For testing purposes
// const filter = {
//     causes: [], // empty array will include all causes
//     frequencies: ["Monthly", "One-time"], // if not empty, only donations with these frequencies will be included
//     years: []
// };

// Assuming this is how the data will be structured
interface Donation {
    Cause: string;
    Date: Date // bad to use object type
    Amount: number;
    Frequency: string;
}

interface Filter {
    causes: string[];
    frequencies: string[];
    years: string[];
}


// Helper functions
const getUniqueOptions = (data: any[], key: string) => {
    const uniqueValues = Array.from(new Set(data.map(item => item[key])));
    return uniqueValues.map(value => ({ label: value, value }));
};

const getUniqueYearOptions = (data: any[], key: string) => {
    const uniqueYears = Array.from(new Set(data.map(item => new Date(item[key]).getFullYear())));
    return uniqueYears.map(year => ({ label: year.toString(), value: year.toString() }));
};


const DashboardPage = (): React.ReactElement => {
    const [filter, setFilter] = useState<Filter>({
        causes: [],
        frequencies: [],
        years: []
    });

    // Generate filter options from data
    const causeOptions = getUniqueOptions(donationsData, 'Cause');
    const frequencyOptions = getUniqueOptions(donationsData, 'Frequency');
    const yearOptions = getUniqueYearOptions(donationsData, 'Date');

    const handleFilterChange = (type: keyof Filter) => (selected: { value: string; label: string }[] | { value: string; label: string } | null) => {
        const selectedValues = Array.isArray(selected) ? selected.map(option => option.value) : selected?.value;
        setFilter(prev => ({ ...prev, [type]: selectedValues }));
    };

    // Function to map string values back to objects for the selectedOptions prop
    const mapSelectedOptions = (selectedValues: string[], options: { label: string, value: string }[]) => {
        return options.filter(option => selectedValues.includes(option.value));
    };

    const resetFilters = () => {
        setFilter({
            causes: [],
            frequencies: [],
            years: [],
        });
    };

    return (
        <div>
            <h1>Your Donations</h1>
            {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore */}
            <Flex direction="row" justify="space-between">
                <Box flex={1.2} mr={3}>
                    <FilterDropdown
                        label="Causes"
                        options={causeOptions}
                        selectedOptions={mapSelectedOptions(filter.causes, causeOptions)}
                        onChange={handleFilterChange('causes')}
                        isMulti
                    />
                </Box>
                <Box flex={0.9} mr={3}>
                    <FilterDropdown
                        label="Frequencies"
                        options={frequencyOptions}
                        selectedOptions={mapSelectedOptions(filter.frequencies, frequencyOptions)}
                        onChange={handleFilterChange('frequencies')}
                        isMulti={false}
                    />
                </Box>
                <Box flex={0.9}>
                    <FilterDropdown
                        label="Years"
                        options={yearOptions}
                        selectedOptions={mapSelectedOptions(filter.years, yearOptions)}
                        onChange={handleFilterChange('years')}
                        isMulti={false}
                    />
                </Box>
                <Text cursor="pointer" _hover={{ color: "blue.500" }} onClick={resetFilters}>Reset Filters</Text>
            </Flex>
            <DonationsTable filter={filter} data={donationsData} />
        </div>
    );
};

export default DashboardPage;