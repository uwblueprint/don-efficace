import React from 'react';
import { Table, Tbody, Tr, Td } from '@chakra-ui/react';


type Cause = {
  id: number;
  name: string;
  impact: number;
}

interface ImpactPerCauseProps {
  data: Cause[];
}

const ImpactPerCause: React.FC<ImpactPerCauseProps> = ({ data }) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Table variant="simple">
      <Tbody>
        {data.map((cause) => (
          <Tr key={cause.id}>
            <Td>{cause.name}</Td>
            <Td>{cause.impact}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default ImpactPerCause;
