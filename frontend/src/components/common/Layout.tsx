import { Box } from '@chakra-ui/react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Navbar from './NavBar';
import Dashboard from '../temp_navbar/Dashboard';
import AccountManagement from '../temp_navbar/AccountManagement';
import DonationHistory from '../temp_navbar/DonationHistory';
import TotalValueDonatedBox from './TotalValueDonated';

const Layout = () => {
    return (
        <Box>
        <Navbar />
        <Box as="main" p={4}>
            <Switch>
            <Route path="/layout/dashboard" component={Dashboard} />
            <Route path="/layout/donation-history" component={DonationHistory} />
            <Route path="/layout/account-management" component={AccountManagement} />
            </Switch>
        </Box>
        <TotalValueDonatedBox
            title="Total Value Donated"
            totalValueDonated={1000}
            text="since your first donation"
        />
        </Box>
    );
    };

export default Layout;
