import React, { useState } from 'react';
import { Box, Text, Flex, Button, Center, Checkbox } from "@chakra-ui/react";

interface SelectCauseCheckboxProps {
  label: string;
  onChange: (checked: boolean) => void;
}

const SelectCauseCheckbox: React.FC<SelectCauseCheckboxProps> = ({ label, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    onChange(isChecked);
  };

  // const allChecked = checked.every(Boolean)
  // const isIndeterminate = checked.some(Boolean) && !allChecked

  // As of right now, impact is fetched from this link. In the future, this will be replaced by authContext.
  // Change to localhost:5000 and modify the userId below based on the data entered in Prisma
  // async function fetchCauseData(userId: string) {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_BACKEND_URL}/impacts/${userId}`,
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching impact data,", error);
  //     return null;
  //   }
  // }

  // useEffect(() => {
  //   // Hardcoded in for testing purposes, change depending on what your user
  //   const userId = "cly144mky0000bntg3dupxlx1";
  //   fetchCauseData(userId).then((data) => {
  //     setCauses(data);
  //   });
  // }, []);

  return (
    <Box w="20rem" h="20rem" mx="auto">
      <Box
        position="absolute"
        w="20rem" // TO DO: Inherits the width from the parent
        height="3rem"
        mx="auto"
        p={3}
        m={3}
        borderWidth="2px"
        borderRadius="md"
        overflow="hidden"
        borderColor="#A5154C"
        bg="#A5154C"
        transform="translate(-0.25rem, 0.25rem)" // Move 0.25rem to the right and up
        zIndex={1} // Lower z-index, this will appear behind
      />
      <Box
        // maxW="20rem"
        position="absolute"
        width="20rem"
        height="3rem"
        mx="auto"
        p={3}
        m={3}
        borderWidth="2px"
        borderRadius="md"
        overflow="hidden"
        borderColor="#A5154C"
        bg="white"
        zIndex={2} // Higher z-index, this will appear in front
        _active={{
          transform: "translate(-0.25rem, 0.25rem)", // Move the box 1rem left and 1rem down
          zIndex:"2"
        }}
      >
        {/* <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      /> */}
        <Checkbox
          isChecked={checked}
          // isIndeterminate={isIndeterminate}
          onChange={(e) => setChecked(e.target.checked)}
          m={0}
          zIndex={2} // Higher z-index, this will appear in front
        >
          {label}
        </Checkbox>
      </Box>
    </Box>
  );
};

export default SelectCauseCheckbox;