import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
} from '@chakra-ui/react'

interface Donation {
    Cause: string;
    Date: Date;
    Amount: number;
    Frequency: string;
}

interface Filter {
    causes?: string[];
    frequencies?: string[];
    years?: string[];
}

interface DonationsTableProps {
    filter: Filter;
    data: Donation[];
}

const DonationsTable: React.FC<DonationsTableProps> = ({ filter, data }) => {
    const filterData = () => {
        return data.filter(donation => {
            return (!filter.causes || filter.causes.length === 0 || filter.causes.includes(donation.Cause)) &&
                (!filter.frequencies || filter.frequencies.length === 0 || filter.frequencies.includes(donation.Frequency)) &&
                (!filter.years || filter.years.length === 0 || filter.years.includes(new Date(donation.Date).getFullYear().toString()));
        });
    };

    const filteredData = filterData();

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <TableContainer>
            <Box border='1px' borderColor='gray.200' borderRadius="xl" overflow="hidden">
                <Table variant='striped' colorScheme='gray'>
                    <TableCaption>Donations</TableCaption>
                    <Thead>
                        <Tr bgColor='#fadbe7'>
                            <Th textAlign="left" textTransform="none">Cause</Th>
                            <Th textAlign="left" textTransform="none">Date</Th>
                            <Th textAlign="left" textTransform="none">Time</Th>
                            <Th textAlign="left" textTransform="none">Amount</Th>
                            <Th textAlign="left" textTransform="none">Frequency</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredData.map((donation, index) => (
                            <Tr key={index}>
                                <Td>{donation.Cause}</Td>
                                <Td>{donation.Date.toLocaleDateString()}</Td>
                                <Td>{donation.Date.toLocaleDateString()}</Td>
                                <Td>{donation.Amount}</Td>
                                <Td>{donation.Frequency}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </TableContainer>
    );
};

export default DonationsTable;