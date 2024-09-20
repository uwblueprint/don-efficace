import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './NavBar';
import Dashboard from '../temp_navbar/Dashboard';
import AccountManagement from '../temp_navbar/AccountManagement';
import DonationHistory from '../temp_navbar/DonationHistory';
import TotalValueDonatedBox from './TotalValueDonated';

interface TotalDonationsResponse {
    totalValueDonated: number;
}

const Layout: React.FC = () => {
    const [totalValueDonated, setTotalValueDonated] = useState(0);
    const userId = 'cly144mky0000bntg3dupxlx1';

    useEffect(() => {
        const fetchTotalDonations = async () => {
            try {
                const response = await fetch(`/donations/total/${userId}`);
                if (response.ok) {
                    const data: TotalDonationsResponse = await response.json();
                    setTotalValueDonated(data.totalValueDonated);
                } else {
                    console.error('Failed to fetch total donations:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching total donations:', error);
            }
        };
    
        fetchTotalDonations();
    }, [userId]);
    

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
                totalValueDonated={totalValueDonated}
                text="since your first donation"
            />
        </Box>
    );
};

export default Layout;
