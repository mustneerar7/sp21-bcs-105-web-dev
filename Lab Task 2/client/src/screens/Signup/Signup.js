// DESC: This is the login screen.
// It handles the login logic and displays the login form.

import React from "react";

import SignupPresentation from "./SignupPresentation";
import usePostApi from "../../hooks/usePostApi";

import URLs from "../../utils/strings";

const Signup = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const { response, post } = usePostApi();

  // Actions to be performed when response is received.
  React.useEffect(() => {
    if (response) {
      if (response.status === "success") {
        loginSuccess();
      }
    }
  }, [response]);

  // Handles login logic.
  const handleLogin = () => {

    passwordsMatch();

    const data = {
      email,
      password,
    };
    post(URLs.SIGN_UP, data);
  };

  // Function to be called when login is successful.
  const loginSuccess = () => {
    // navigate to /
    window.location.href = "/";
  };

  // check if both passwords are the same
  const passwordsMatch = () => {
    return password === confirmPassword;
  };

  // Returns presentation component.
  return (
    <SignupPresentation
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      handleLogin={handleLogin}
      response={response}
    />
  );
};

export default Signup;
