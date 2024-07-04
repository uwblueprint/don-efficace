import React from 'react';
import { Box } from '@chakra-ui/react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './NavBar';
import Dashboard from '../temp_navbar/Dashboard';
import AccountManagement from '../temp_navbar/AccountManagement';
import DonationHistory from '../temp_navbar/DonationHistory';


const Layout = () => {
    return (
        <Box>
            <Navbar />
            <Box as="main" p={4}>
                <Switch>
                <Route path="/layout/dashboard" exact component={Dashboard} />
                <Route path="/layout/donation-history" exact component={DonationHistory} />
                <Route path="/layout/account-management" exact component={AccountManagement} />
                </Switch>
            </Box>
        </Box>
    );
    };

export default Layout;
