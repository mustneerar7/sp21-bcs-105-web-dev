import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import Login from "./screens/Login/Login";
import Home from "./screens/Home/Home";
import Signup from "./screens/Signup/Signup";

import { PlaybackProvider } from "./context/PlaybackContext";
import { AppProvider } from "./context/AppContext";

function App() {
  const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("accessToken");
    return token;
  };

  if (getTokenFromLocalStorage()) {
    return (
      <AppProvider>
        <PlaybackProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </PlaybackProvider>
      </AppProvider>
    );
  } else {
    return (
      <AppProvider>
        <PlaybackProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Router>
        </PlaybackProvider>
      </AppProvider>
    );
  }
}

export default App;
