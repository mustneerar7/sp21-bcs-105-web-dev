// DESC: This is the login screen.
// It handles the login logic and displays the login form.

import React from "react";

import LoginPresentation from "./LoginPresentation";
import usePostApi from "../../hooks/usePostApi";

import URLs from "../../utils/strings";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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
    const data = {
      email,
      password,
    };
    post(URLs.LOG_IN, data);
  };

  // Function to be called when login is successful.
  const loginSuccess = () => {
    localStorage.setItem("data", JSON.stringify(response.data));
    localStorage.setItem("accessToken", response.accessToken);
    window.location.reload();
  };

  // Returns presentation component.
  return (
    <LoginPresentation
      setEmail={setEmail}
      setPassword={setPassword}
      handleLogin={handleLogin}
      response={response}
    />
  );
};

export default Login;
