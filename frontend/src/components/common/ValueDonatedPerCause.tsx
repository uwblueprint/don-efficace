
import React from 'react'
import ReactDOM from 'react-dom'
import { Heading, Box, Flex, Text } from "@chakra-ui/react";
import { PieChart } from 'react-minimal-pie-chart';

const ValueDonated = () => {
    const data = [
        { title: 'Health & Solidarity Fund', value: 62.5, color: '#F8E791' },
        { title: 'Education & Research Fund', value: 25, color: '#E88787' },
        { title: 'Animal Welfare & Environment Fund', value: 12.5, color: '#A1DBC6' },
        { title: 'Supporting Don Efficace', value: 0, color: '#A5154C' },
    ];

    return (
        <>
            <Box borderWidth="1px" borderRadius="lg" borderColor="#E0DCDA" style={{ marginTop: "2%" }}>
        {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore  */}
            <Heading style={{ textAlign: 'center', padding: '20px', color: "#645B56", fontSize: "20px" }}>
                <b>Value Donated Per Cause</b>
            </Heading> 
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{width: "500px", height: "500px"}}>
                    <PieChart
                        label={({ dataEntry }) => (dataEntry.value !== 0 ? `${dataEntry.percentage}%` : '')}
                        labelStyle={{
                            fontSize: '4px',
                            fontFamily: 'Nunito',
                        }}
                        radius={40}
                        data={data}
                    />
                    </div>

                <Flex direction="column" gap={2}>
                {data.map((item) => (
                    <Flex key={item.title} alignItems="center" gap={2}>
                        <Box
                            w="20px"
                            h="20px"
                            bg={item.color}
                            minWidth="20px"
                        />
                        <Text color="#645B56" fontSize="16px">
                            {item.title}
                        </Text>
                    </Flex>
                ))}

                </Flex>
                </div>
            </Box>
        </>
    )
}

export default ValueDonated