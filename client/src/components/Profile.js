import React from "react";

const Profile = ({ pageTitle, setPageTitle }) => {
  React.useEffect(() => {
    setPageTitle("Profile");
  }, []);

  return <div>Profile</div>;
};

export default Profile;
