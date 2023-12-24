// Desc: Login Screen Presentation Component

import "./Signup.css";

const SignupPresentation = ({
  setEmail,
  setPassword,
  handleLogin,
  response,
  setConfirmPassword
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

        <input
          type="password"
          className="TextInput"
          placeholder="Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <p style={{
          color: "#f2f2f2",
          fontFamily: "InterMedium",
          fontSize: "10px",
          marginTop: "10px",
          marginBottom: "10px"
        }}>By clicking Sign up, I agree to Vibin's terms and conditions and privacy policy.</p>

        <button className="Button" onClick={handleLogin}>
          Sign up
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
          <p className="TextButton">Already have an account?</p>
          <a
            className="TextButton"
            style={{
              color: "#00FFFF",
              marginLeft: "5px",
              fontFamily: "InterMedium",
            }}
            href="/"
          >
            Login
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

export default SignupPresentation;
