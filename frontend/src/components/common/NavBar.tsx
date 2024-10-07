import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Link,
  useColorModeValue,
  Tabs,
  TabList,
  TabIndicator,
  Tab,
} from "@chakra-ui/react";
import { NavLink, Link as RouterLink } from "react-router-dom";
import * as Routes from "../../constants/Routes";

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href: string;
  width: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Dashboard",
    href: Routes.DASHBOARD_PAGE,
    width: "140px",
  },
  {
    label: "Donation History",
    href: Routes.DONATION_PAGE,
    width: "190px",
  },
  {
    label: "Account Management",
    href: Routes.ACCOUNT_PAGE,
    width: "240px",
  },
];

export default function Navbar() {
  return (
    <Box mb="0">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH="104px"
        minW="1100px"
        gap="16px"
        mb="0"
        justify={{ base: "center" }}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottomWidth="1px"
        justifyContent="space-between"
        borderStyle="solid"
        boxShadow="sm"
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align="flex-end"
        alignItems="center"
      >
        <Text
          align="center"
          mb="4px"
          ml="20px"
          alignItems="center"
          pl="20px"
          minW="230px"
        >
          <Link
            as={RouterLink}
            to="/"
            _hover={{ textDecoration: "none" }}
            _focus={{ outline: "none" }}
            _active={{ outline: "none" }}
          >
            <Text as="span" color="#000000" fontWeight="bold" fontSize="30px">
              Don{" "}
            </Text>
            <Text as="span" color="#A5154C" fontWeight="bold" fontSize="30px">
              Efficace.
            </Text>
          </Link>
        </Text>
        <Tabs position="relative" variant="unstyled">
          <TabList justifyContent="space-between">
            {NAV_ITEMS.map((navItem) => (
              <Tab
                key={navItem.label}
                minW={navItem.width}
                borderStyle="solid"
                alignItems="center"
                as={RouterLink}
                to={navItem.href}
                fontSize="20px"
                color="#000000"
                mx="50px"
                _hover={{
                  textDecoration: "none",
                  color: "#000000",
                  cursor: "pointer",
                }}
                _focus={{ outline: "none" }}
                _active={{ outline: "none" }}
              >
                {navItem.label}
              </Tab>
            ))}
          </TabList>
          <TabIndicator
            position="absolute"
            mt="26px"
            height="4px"
            bg="#A5154C"
            borderRadius="1px"
          />
        </Tabs>
        <Text align="center" minW="150px" alignItems="center" pr="30px">
          <RouterLink to="/donate">
            <Button
              as="a"
              width="153px"
              height="50px"
              display={{ base: "center" }}
              fontSize="20px"
              ml="20px"
              mr="30px"
              fontWeight={600}
              color="#FFFFFF"
              bg="#A5154C"
              _hover={{
                bg: "#A5154C",
                color: "#FFFFFF",
                cursor: "pointer",
              }}
            >
              Donate Now
            </Button>
          </RouterLink>
        </Text>
      </Flex>
    </Box>
  );
}
