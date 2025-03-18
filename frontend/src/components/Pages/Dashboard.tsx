import React, { useContext, useEffect, useState } from "react"; 
import { AuthContext } from "../LandingPage/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  if (!authContext) {
    return <p>Error: AuthContext not available</p>;
  }

  const { user, loading, setUser } = authContext;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating API response delay (Adjust as needed)
    
    if (user) {
      console.log("Logged Successfully");
    }
  }, [user]);

  if (loading || isLoading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Authenticating...</p>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <img
            src={
              user.profilePic ||
              'https://static.vecteezy.com/system/resources/thumbnails/018/742/015/small_2x/minimal-profile-account-symbol-user-interface-theme-3d-icon-rendering-illustration-isolated-in-transparent-background-png.png'
            }
            alt="Profile"
            className="profilePic"
          />
          <h3>Welcome, {user.username}</h3>
          <h4>You are successfully Logged in</h4>
          <h6>Now you can create any post <p
              className="text-primary"
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => navigate(`/create`)}
            >
              Click Here To Post
            </p></h6>
          <p>Your Email: {user.email}</p>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
          <p className="mt-3 text-muted">
          <strong>User Guide:</strong> If you encounter any errors or loading issues, try the following steps:
          <ol className="mt-2" style={{ textAlign: "left", paddingLeft: "20px" }}>
            <li>Close the website and open it again.</li>
            <li>If the issue persists, log out, close the website, and then re-enter and log in again.</li>
          </ol>
        </p>

        </div>
      ) : (
        <p className="error-text">Please Refresh The Browser or Log in again.</p>
      )}
    </div>
  );
};

export default Dashboard;





/*

         */