import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import authAPIClient from "../../APIClients/AuthAPIClient";
import { HOME_PAGE, SIGNUP_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";
import postcard from "../../constants/postcard.png";

type GoogleResponse = GoogleLoginResponse | GoogleLoginResponseOffline;

type GoogleErrorResponse = {
  error: string;
  details: string;
};

const HomePage = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onLogInClick = async () => {
    const user: AuthenticatedUser = await authAPIClient.login(email, password);
    setAuthenticatedUser(user);
  };

  const onSignUpClick = () => {
    history.push(SIGNUP_PAGE);
  };

  const onGoogleLoginSuccess = async (tokenId: string) => {
    const user: AuthenticatedUser = await authAPIClient.loginWithGoogle(
      tokenId,
    );
    setAuthenticatedUser(user);
  };

  if (authenticatedUser) {
    // eslint-disable-next-line react/react-in-jsx-scope
    return <Redirect to={HOME_PAGE} />;
  }

  return (
    <Flex height="100vh">
      <Box
        flex="2"
        bg="#C61F5C"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          flexDirection="column"
          width="60%"
          height="80%"
          justifyContent="center"
          alignItems="center"
        >
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
      <Box
        flex="1"
        bg="#FFFFFF"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p="200px 20px"
        gap="20px"
      >
        <Box
          width="60%"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          <Text color="#000000" fontWeight="bold" fontSize="30px">
            Don
          </Text>
          <Text color="#A5154C" fontWeight="bold" fontSize="30px">
            Efficace.
          </Text>
        </Box>

        <form>
          <div>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="username@domain.com"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="password"
            />
          </div>
          <div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={onLogInClick}
            >
              Log In
            </button>
          </div>

          <GoogleLogin
            clientId={process.env.REACT_APP_OAUTH_CLIENT_ID || ""}
            buttonText="Login with Google"
            onSuccess={(response: GoogleResponse): void => {
              if ("tokenId" in response) {
                onGoogleLoginSuccess(response.tokenId);
              } else {
                // eslint-disable-next-line no-alert
                window.alert(response);
              }
            }}
            onFailure={(error: GoogleErrorResponse) =>
              // eslint-disable-next-line no-alert
              window.alert(JSON.stringify(error))
            }
          />
        </form>

        <div>
          <button
            className="btn btn-primary"
            type="button"
            onClick={onSignUpClick}
          >
            Sign Up
          </button>
        </div>
      </Box>
    </Flex>
  );
};

export default HomePage;
