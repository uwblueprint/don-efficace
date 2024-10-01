// Layout.tsx
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
  const userId = 'cm1phm2o3000011xw24rh5ulh';

  useEffect(() => {
    const fetchTotalDonations = async () => {
      try {
          const dummyData = { totalValueDonated: 12345 };
          console.log("Using dummy data: ", dummyData);
          setTotalValueDonated(dummyData.totalValueDonated);
      } catch (error) {
          console.error('Error setting dummy data:', error);
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

      {/* Total Donations Component */}
      <TotalValueDonatedBox
        title="Total Value Donated"
        totalValueDonated={totalValueDonated}
        text="since your first donation"
      />
    </Box>
  );
};

export default Layout;
