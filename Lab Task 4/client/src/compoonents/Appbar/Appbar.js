// Desc: Container component for Appbar.

import React from "react";

import { AppContext } from "../../context/AppContext";
import AppbarPresentation from "./AppbarPresentation";

const AppbarContainer = ({ search }) => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const { user, currentView  } = React.useContext(AppContext);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <AppbarPresentation
      currentView={currentView}
      search={search}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      openMenu={openMenu}
      toggleMenu={toggleMenu}
      user={user}
    />
  );
};

export default AppbarContainer;
