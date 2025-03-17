import React, { useContext, useEffect } from "react";
import { AuthContext } from "../LandingPage/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    return <p>Error: AuthContext not available</p>;
  }

  const { user, loading, setUser } = authContext;

  useEffect(() => {
    if (user) {
      //console.log("User data:", user); // Log user data to check if it's fetched correctly
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Reset user state
    navigate("/login"); // Redirect to login page
  };


  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {/* {error && <p className="text-danger">{error}</p>} */}
      {user ? (
        <div>
          <img
              src={user.profilePic || 'https://static.vecteezy.com/system/resources/thumbnails/018/742/015/small_2x/minimal-profile-account-symbol-user-interface-theme-3d-icon-rendering-illustration-isolated-in-transparent-background-png.png'}
              alt="Profile"
              className="profilePic"
            />
          <h3>Welcome, {user.username}</h3>
          <h4>You are successfully Logged in</h4>
          <h6>Now you can create any post</h6>
          <p>Your Email: {user.email}</p>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      ) : (
        <p>Loading user data...For quick reload just Refresh the page after 5-10 seconds 😀</p>
      )}
    </div>
  );
};

export default Dashboard;
