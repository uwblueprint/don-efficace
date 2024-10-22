import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Route, Switch, useHistory } from "react-router-dom";
import Navbar from "./NavBar";
import DonationDashboard from "../pages/DonationDashboard";
import AccountManagement from "../temp_navbar/AccountManagement";
// import DonationHistory from "../temp_navbar/DonationHistory";
import DonationHistory from "../pages/DonationHistory";
import * as Routes from "../../constants/Routes";

const Layout: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    history.push(Routes.DASHBOARD_PAGE);
  }, []);

  return (
    <Box>
      <Navbar />
      <Box as="main" p={4}>
        <Switch>
          <Route
            path={Routes.DASHBOARD_PAGE}
            exact
            component={DonationDashboard}
          />
          <Route
            path={Routes.DONATION_PAGE}
            exact
            component={DonationHistory}
          />
          <Route
            path={Routes.ACCOUNT_PAGE}
            exact
            component={AccountManagement}
          />
        </Switch>
      </Box>
    </Box>
  );
};

export default Layout;
