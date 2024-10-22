import { ChakraProvider } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useReducer, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import Signup from "./components/auth/Signup";
import Layout from "./components/common/Layout";
import NotFound from "./components/pages/NotFound";
import CheckoutSuccessPage from "./components/temp_navbar/CheckoutSuccessPage";
import AUTHENTICATED_USER_KEY from "./constants/AuthConstants";
import * as Routes from "./constants/Routes";
import AuthContext from "./contexts/AuthContext";
import SampleContext, {
  DEFAULT_SAMPLE_CONTEXT,
} from "./contexts/SampleContext";
import SampleContextDispatcherContext from "./contexts/SampleContextDispatcherContext";
import sampleContextReducer from "./reducers/SampleContextReducer";
import { AuthenticatedUser } from "./types/AuthTypes";
import { getLocalStorageObj } from "./utils/LocalStorageUtils";
// import Donate from "./components/temp_navbar/Donate"; // Temp for Navbar
import HomePage from "./components/auth/HomePage";
import DonationForm from "./components/common/DonationForm";

const App = (): React.ReactElement => {
  const currentUser: AuthenticatedUser = getLocalStorageObj<AuthenticatedUser>(
    AUTHENTICATED_USER_KEY,
  );

  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser>(
    currentUser,
  );

  // Some sort of global state. Context API replaces redux.
  // Split related states into different contexts as necessary.
  // Split dispatcher and state into separate contexts as necessary.
  const [sampleContext, dispatchSampleContextUpdate] = useReducer(
    sampleContextReducer,
    DEFAULT_SAMPLE_CONTEXT,
  );

  return (
    <SampleContext.Provider value={sampleContext}>
      <SampleContextDispatcherContext.Provider
        value={dispatchSampleContextUpdate}
      >
        <ChakraProvider>
          <AuthContext.Provider
            value={{ authenticatedUser, setAuthenticatedUser }}
          >
            <Router>
              <Switch>
                <Route exact path={Routes.LOGIN_PAGE} component={HomePage} />
                <Route exact path={Routes.SIGNUP_PAGE} component={Signup} />
                <Route path={Routes.DONATE} component={DonationForm} />
                <Route
                  path={Routes.CHECKOUT_SUCCESS}
                  component={CheckoutSuccessPage}
                />
                <PrivateRoute path={Routes.HOME_PAGE} component={Layout} />
                <Route exact path="*" component={NotFound} />
              </Switch>
            </Router>
          </AuthContext.Provider>
        </ChakraProvider>
      </SampleContextDispatcherContext.Provider>
    </SampleContext.Provider>
  );
};

export default App;
