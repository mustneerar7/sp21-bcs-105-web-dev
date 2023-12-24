// Desc: Login Screen Presentation Component

import "./Login.css";

const LoginPresentation = ({
  setEmail,
  setPassword,
  handleLogin,
  response,
}) => {
  return (
    <div className="App">
      <img
        src={require("../../assets/images/logo.png")}
        style={{
          width: "200px",
          marginBottom: "60px",
        }}
        alt="logo"
      />
      <div className="LoginContainer">
        <input
          type="text"
          className="TextInput"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="TextInput"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="Button" onClick={handleLogin}>
          Login
        </button>

        {response?.status === "fail" ? (
          <p
            className="ErrorText"
            style={{
              color: "red",
            }}
          >
            {response.message}
          </p>
        ) : null}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p className="TextButton">Don't have an account?</p>
          <a
            className="TextButton"
            style={{
              color: "#00FFFF",
              marginLeft: "5px",
              fontFamily: "InterMedium",
            }}
            href="/signup"
          >
            Sign Up
          </a>
        </div>
      </div>
      <footer className="Footer">
        <p className="TextLabel">
          © 2023, Vibin media. All Rights Reserved. Terms and conditions apply.
        </p>
      </footer>
    </div>
  );
};

export default LoginPresentation;
