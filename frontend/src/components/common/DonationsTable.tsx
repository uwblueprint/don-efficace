import React, { useState } from 'react';
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
    Button,
    Stack,
    Text
} from '@chakra-ui/react'

interface Donation {
    Cause: string;
    Date: Date;
    Amount: number;
    Frequency: string;
    TransactionID: string;
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
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    // Filters data based on current filter settings for causes, frequencies, and years.
    // Only add matching donations for all three filters to the returned array.
    const filterData = () => {
        return data.filter(donation => {
            return (!filter.causes || filter.causes.length === 0 || filter.causes.includes(donation.Cause)) &&
                (!filter.frequencies || filter.frequencies.length === 0 || filter.frequencies.includes(donation.Frequency)) &&
                (!filter.years || filter.years.length === 0 || filter.years.includes(new Date(donation.Date).getFullYear().toString()));
        });
    };

    const filteredData = filterData();

    // Pagination implementation.
    const pageCount = Math.ceil(filteredData.length / entriesPerPage);
    const changePage = (offset: number) => {
        setCurrentPage((prev) => Math.max(0, Math.min(pageCount - 1, prev + offset)));
    };

    const startEntry = currentPage * entriesPerPage + 1;
    const endEntry = Math.min((currentPage + 1) * entriesPerPage, filteredData.length);
    const currentData = filteredData.slice(currentPage * entriesPerPage, endEntry);

    return (
        // We need these two comments to prevent "Expression produces a union type that is too complex to represent."
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <TableContainer padding="16px">
            <Box border='1px' borderColor='gray.200' borderRadius="xl" overflow="hidden">
                <Table variant='striped' colorScheme='gray' color="#4E5153">
                    <Thead>
                        <Tr bgColor='#fadbe7'>
                            <Th textAlign="left" textTransform="none" padding="16px">Cause</Th>
                            <Th textAlign="left" textTransform="none">Date</Th>
                            <Th textAlign="left" textTransform="none">Time</Th>
                            <Th textAlign="left" textTransform="none">Amount</Th>
                            <Th textAlign="left" textTransform="none">Frequency</Th>
                            <Th textAlign="left" textTransform="none">Transaction ID</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {currentData.map((donation, index) => (
                            <Tr key={index}>
                                <Td>{donation.Cause}</Td>
                                <Td>{new Date(donation.Date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</Td>
                                <Td>{new Date(donation.Date).toISOString().split('T')[1].substring(0, 5)}</Td>
                                <Td>{donation.Amount}</Td>
                                <Td>{donation.Frequency === "None" ? "One-Time" : donation.Frequency}</Td>
                                <Td>{donation.TransactionID}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
            <Box position="relative" zIndex="1">
                <Stack direction="row" spacing={4} justify="center" m={4} alignItems="center">
                    <Button onClick={() => changePage(-1)} disabled={currentPage <= 0}>
                        Previous
                    </Button>
                    <Text>{startEntry}-{endEntry} of {filteredData.length}</Text>
                    <Button onClick={() => changePage(1)} disabled={currentPage >= pageCount - 1}>
                        Next
                    </Button>
                </Stack>
            </Box>
        </TableContainer>
    );
};

export default DonationsTable;