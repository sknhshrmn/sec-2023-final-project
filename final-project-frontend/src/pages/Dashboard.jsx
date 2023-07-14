import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSessionStorage from "../hook/useSessionStorage";
import Header from "../components/Header";
import Users from "../components/Users";
import MyAccount from "../components/MyAccount";
import Footer from "../components/Footer";
import Customers from "../components/Customers";
import axios from "axios";
import { HOST } from "../api";

const Dashboard = (req, res) => {
  const [user, setUser] = useSessionStorage("userData", null);
  const [jwt, setJwt] = useSessionStorage("access_token", "");
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  // Handle tab change
  const handleTabChange = (e, tabIndex) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };

  // Handle navigation of login button
  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  // Fetch user account
  const fetchUserAccount = async () => {
    // get jwt from localStorage
    // run get api
    const data = await axios
      .get(`${HOST}/private`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then(function (response) {
        // handle success
        console.info(response.data);
        setUser(response.data.userData);
        setIsAdmin(response.data.userData.is_admin);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        handleNavigateToLogin();
      })
      .finally(function () {
        // always executed
      });
  };

  useEffect(() => {
    fetchUserAccount();
  }, [jwt]);

  return (
    <div style={{ minHeight: "100vh", width: "100vw" }}>
      <div style={{ marginBottom: "5rem" }}>
        <Header />
        <div style={{ overflow: "auto" }}>
          <div className="container-dashboard">
            <div className="wrapper-dashboard">
              <h1
                className="greeting"
                style={{
                  alignSelf: "start",
                }}
              >
                Welcome back {user?.fullname}
              </h1>
              <div classname="container-tabs">
                {/* Tabs */}
                <React.Fragment>
                  {isAdmin ? (
                    <Tabs
                      value={currentTabIndex}
                      onChange={handleTabChange}
                      style={{
                        width: "100%",
                      }}
                    >
                      <Tab label="My Account" style={{ alignSelf: "start" }} />
                      <Tab
                        label="List of Customers"
                        style={{ alignSelf: "start" }}
                      />
                      <Tab
                        label="List of Users"
                        style={{ alignSelf: "start" }}
                      />
                    </Tabs>
                  ) : (
                    <Tabs
                      value={currentTabIndex}
                      onChange={handleTabChange}
                      style={{
                        width: "100%",
                      }}
                    >
                      <Tab label="My Account" style={{ alignSelf: "start" }} />
                      <Tab label="Customers" style={{ alignSelf: "start" }} />
                      <Tab
                        label="Users"
                        style={{ alignSelf: "start" }}
                        disabled
                      />
                    </Tabs>
                  )}
                  {/* TAB 1 Contents */}
                  {currentTabIndex === 0 && (
                    <Box style={{ width: "100%", padding: "1.5 rem 0.5rem" }}>
                      <Typography
                        variant="h5"
                        style={{ textAlign: "center", marginTop: "2rem" }}
                      >
                        My Account Information
                      </Typography>
                      <MyAccount />
                    </Box>
                  )}
                  {/* TAB 3 Contents */}
                  {currentTabIndex === 1 && (
                    <Box style={{ width: "100%" }}>
                      <Typography
                        variant="h5"
                        style={{ textAlign: "center", marginTop: "2rem" }}
                      >
                        List of Customers
                      </Typography>
                      <Customers />
                    </Box>
                  )}
                  {/* TAB 3 Contents */}
                  {currentTabIndex === 2 && (
                    <Box style={{ width: "100%" }}>
                      <Typography
                        variant="h5"
                        style={{ textAlign: "center", marginTop: "2rem" }}
                      >
                        List of Users
                      </Typography>
                      <Users />
                    </Box>
                  )}
                </React.Fragment>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
