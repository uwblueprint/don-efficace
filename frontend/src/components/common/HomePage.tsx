import React from "react";
import { Route, Switch } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc'
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  Link,
  useColorModeValue,
  Tabs,
  TabList,
  TabIndicator,
  Tab,
  Center,
} from "@chakra-ui/react";
import postcard from '../../constants/postcard.png'

const HomePage = () => {
  return (
    <Flex height="1124px">
      <Box flex="2" bg="#C61F5C" display="flex" justifyContent="center" alignItems="center">
        <Box display="flex" flexDirection="column" width="60%" height="80%" justifyContent="center" alignItems="center">
          <Image
            src={postcard}
            alt="Image 1"
            transform="rotate(-6.31deg)"
            zIndex="3"
            width="80%"
            mr="-25px"
          />
          <Image
            src={postcard}
            alt="Image 2"
            transform="rotate(4.17deg)"
            zIndex="2"
            width="80%"
            mt="-30px"
            mb="-70px"
            ml="-150px"
          />
          <Image
            src={postcard}
            alt="Image 3"
            transform="rotate(0.29deg)"
            zIndex="1"
            width="80%"
            ml="-30px"
          />
        </Box>
      </Box>
      <Box flex="1" bg="#FFFFFF" display="flex" flexDirection="column" justifyContent="center" alignItems="center" p="200px 20px" gap="20px">
        <Box width="60%" display="flex" flexDirection="column" alignItems="flex-start">
          <Text color="#000000" fontWeight="bold" fontSize="30px">
            Don
          </Text>
          <Text color="#A5154C" fontWeight="bold" fontSize="30px">
            Efficace.
          </Text>
        </Box>
        <Button w="60%" variant="outline" rightIcon={<FcGoogle/>} borderColor="black" borderWidth="1px">
          <Center>
            <Text>Log in with Google</Text>
          </Center>
        </Button>
      </Box>
    </Flex>
  );
};

export default HomePage;
