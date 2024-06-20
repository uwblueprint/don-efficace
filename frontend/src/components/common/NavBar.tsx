import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Link,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href: string
}

const NAV_ITEMS: Array<NavItem> = [
    {
      label: 'Dashboard',
      href: '/layout/dashboard',
    },
    {
      label: 'Donation History',
      href: '/layout/donation-history',
    },
    {
      label: 'Account Management',
      href: '/layout/account-management',
    },
  ]

const Tabs = () => {
    return (
      <Stack m='20px' direction='row' spacing={1} justify="space-between" flex="1" width="100%">
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Link
              as={RouterLink}
              m='10px'
              to={navItem.href}
              px={2}
              py={1}
              rounded='md'
              fontSize='20px'
              color='#000000'
              _hover={{
                textDecoration: 'none',
                bg: 'gray.200',
              }}
            >
              {navItem.label}
            </Link>
          </Box>
        ))}
      </Stack>
    )
  }  

export default function Navbar() {
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH='104px'
        justify={{ base: 'center'}}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle='solid'
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align='center'>
        <Flex flex={{ base: 1 }} justify='flex-end' alignItems='center'>
          <Text align='center' alignItems='center'>
            <Text as="span" color="#000000" fontWeight="bold" fontSize="30px">Don </Text>
            <Text as="span" color="#A5154C" fontWeight="bold" fontSize="30px">Efficace.</Text>
          </Text>
          <Flex m='20px' flex={{ base: 1 }} justify={{ base: 'center', md: 'space-between' }} display={{ base: 'none', md: 'flex' }}>
            <Tabs />  
          </Flex>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify='flex-end'
          direction='row'
          spacing={6}>
          <RouterLink to="/donate">
            <Button
              as='a'
              width='153px'
              height='50px'
              display={{ base: 'center', md: 'left' }}
              fontSize='20px'
              fontWeight={600}
              cursor='pointer'
              color='#FFFFFF'
              bg='#A5154C'
              _hover={{
                bg: '#A5154C',
                color: '#FFFFFF'
              }}>
              Donate Now
            </Button>
          </RouterLink>
        </Stack>
      </Flex>
    </Box>
  )
}
