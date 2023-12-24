import React from "react";
import { clearLocalStorage } from "../../utils/utils";

import { AppContext } from "../../context/AppContext";

const Menu = ({ user, menuCloseCallback }) => {
  const { setCurrentView } = React.useContext(AppContext);

  return (
    <div className="ProfileMenu">
      <div
        className="ProfileMenuButton"
        style={{
          backgroundColor: "#000000",
          marginBottom: "10px",
        }}
      >
        {user?.email}
      </div>
      <button
        className="ProfileMenuButton"
        style={{ color: "red" }}
        onClick={() => {
          clearLocalStorage();
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Menu;
