import React from 'react';
import { Table, Tbody, Tr, Td } from '@chakra-ui/react';
import ImpactPerCause from './ImpactPerCause';

// this component wraps around total impact per cause and the other sub components

const ImpactSummary = () => {
  return (

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Table variant='simple'>
        <Tbody>
            <Tr>
                <Td colSpan={3}>Impact Summary</Td>
            </Tr>
            <Tr>
                <Td>Total Value Donated Per Cause</Td>
            </Tr>
            <Tr>
                <Td>Total Impact Per Cause</Td>
                {/* <Td><ImpactPerCause /></Td> */}
            </Tr>
            <Tr>
                <Td>Total Value Donated</Td>
            </Tr>
        </Tbody>
    </Table>
  );
}

export default ImpactSummary;