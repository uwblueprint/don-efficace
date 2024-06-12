import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex, Text } from '@chakra-ui/react';
import DonationsTable from "../common/DonationsTable";
import FilterDropdown from "../common/FilterDropdown";
// import donationsData from '../../constants/donationsDataSample'; // sample for testing purposes

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

const DashboardPage = (): React.ReactElement => {
    const [donationsData, setDonationsData] = useState<any[]>([]);
    const [filter, setFilter] = useState<Filter>({
        causes: [],
        frequencies: [],
        years: []
    });


    async function getUserDonations() {
        try {
            const response = await axios.get('http://localhost:5000/donations/1');

            // transform fetched data to match the format of the table data
            const transformedData = response.data.map((donation: any) => ({
                Cause: donation.cause_id,
                Date: new Date(donation.donation_date),
                Amount: donation.amount,
                Frequency: donation.is_recurring,
            }));

            // set transformed data
            setDonationsData(transformedData);
        } catch (error) {
            console.error(error);
        }
    }

    // Call the function when the component mounts
    useEffect(() => {
        getUserDonations();
    }, []);

    const getUniqueOptions = (key: string) => {
        const uniqueValues = Array.from(new Set(donationsData.map(item => item[key])));
        return uniqueValues.map(value => ({ label: value, value }));
    };

    const getUniqueYearOptions = (key: string) => {
        const uniqueYears = Array.from(new Set(donationsData.map(item => new Date(item[key]).getFullYear())));
        return uniqueYears.map(year => ({ label: year.toString(), value: year.toString() }));
    };


    // Generate filter options from data
    const causeOptions = getUniqueOptions('Cause');
    const frequencyOptions = getUniqueOptions('Frequency');
    const yearOptions = getUniqueYearOptions('Date');

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
        <div id="dashboardPage">
            <h1 id="tableTitle">Your Donations</h1>
            {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore */}
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
        </div>
    );
};




export default DashboardPage;

