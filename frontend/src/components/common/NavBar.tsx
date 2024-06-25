import {
  Box,
  Flex,
  Text,
  Button,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href: string,
  width: string
}

const NAV_ITEMS: Array<NavItem> = [
    {
      label: 'Dashboard',
      href: '/layout/dashboard',
      width: '140px',
    },
    {
      label: 'Donation History',
      href: '/layout/donation-history',
      width: '190px',
    },
    {
      label: 'Account Management',
      href: '/layout/account-management',
      width: '210px',
    },
  ]

export default function Navbar() {
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH='104px'
        minW='1100px'
        gap='16px'
        justify={{ base: 'center'}}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottomWidth='2px'
        borderColor='#A5154C'// Bottom border color
        justifyContent='space-between'
        borderStyle='solid'
        boxShadow='lg'
        // borderColor={useColorModeValue('gray.200', 'gray.900')}
        align='center'
        alignItems='center'>
        <Text align='center' mb='8px' alignItems='center' pl='20px' minW='230px'>
          <Link as={RouterLink} to="/" _hover={{textDecoration: "none"}} _focus={{ outline: "none" }} _active={{ outline: "none" }}>
            <Text as="span" color="#000000" fontWeight="bold" fontSize="30px">Don </Text>
            <Text as="span" color="#A5154C" fontWeight="bold" fontSize="30px">Efficace.</Text>
          </Link>
        </Text>
        {NAV_ITEMS.map((navItem) => (
          <Link
            key=''
            as={RouterLink}
            m='20px'
            to={navItem.href}
            fontSize='20px'
            color='#000000'
            minW={navItem.width}
            _hover={{
              textDecoration: "underline",
              color: '#A5154C',
              cursor: 'pointer'
            }}
            _focus={{ outline: "none" }}
            _active={{ outline: "none" }}
          >
            {navItem.label}
          </Link>
        ))}
        <Text align='center' minW='150px' alignItems='center' pr='30px'>
          <RouterLink to="/donate">
            <Button
              as='a'
              width='153px'
              height='50px'
              display={{ base: 'center' }}
              fontSize='20px'
              ml='20px'
              fontWeight={600}
              color='#FFFFFF'
              bg='#A5154C'
              _hover={{
                bg: '#A5154C',
                color: '#FFFFFF',
                cursor: 'pointer'
              }}>
              Donate Now
            </Button>
          </RouterLink>
        </Text>
      </Flex>
      
    </Box>
  )
}
