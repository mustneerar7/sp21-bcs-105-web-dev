import React from "react";
import "./Profile.css";
import { AppContext } from "../../context/AppContext";

const Profile = () => {
  const { user } = React.useContext(AppContext);

  return (
    <div className="ProfileContainer">
    </div>
  );
};

export default Profile;
