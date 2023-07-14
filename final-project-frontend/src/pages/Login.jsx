import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { HOST } from "../api";
import useSessionStorage from "../hook/useSessionStorage";
import { useAlert } from "react-alert";

const Login = (req, res, next) => {
  const alert = useAlert();
  const [isLoading, setLoading] = useState(false);
  const [jwt, setJwt] = useSessionStorage("access_token", "");

  // Handle navigation for success login
  const navigate = useNavigate();
  const handleSucesssNavigation = () => {
    navigate("/dashboard");
    if (!jwt) {
      window.location.reload();
    }
  };
  // Handle navigation for error during login
  const handleErrorNavigation = (message) => {
    alert.show("Error! " + message);
    navigate("/login");
  };

  // Handle submission of form
  const handleSubmit = (event) => {
    event.preventDefault();
    const identifier = event.target[0].value;
    const password = event.target[1].value;
    console.log(event);

    // send formObject to api
    setLoading(true);
    // async function then = Promise:resolved, catch = Promise:reject, finally = Promise:fetched
    const instance = axios
      .post(`${HOST}/api/login`, {
        identifier,
        password,
      })
      .then(function (response) {
        setJwt(response.data.access_token);
        handleSucesssNavigation();
      })
      .catch(function (error) {
        console.log(error);
        try {
          handleErrorNavigation(error.response.data?.message);
        } catch (err) {
          handleErrorNavigation(error);
        }
      })
      .finally(function () {
        setLoading(false);
      });
  };

  return (
    <div style={{ width: "100vw" }}>
      <Header />
      <div style={{ minHeight: "calc(100vh - 120px - 50px)", padding: "5rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "400px",
            alignItems: "center",
          }}
        >
          <h1 className="title">Log In</h1>
          <p className="sub-title">
            Not registered yet?
            <Link to="/register" style={{ marginLeft: "8px" }}>
              Sign Up
            </Link>
          </p>

          <form
            method="POST"
            style={{ width: "100%", maxWidth: "400px" }}
            onSubmit={handleSubmit}
          >
            <div
              className="wrapper-field"
              style={{
                marginTop: "3rem",
              }}
            >
              <label htmlFor="identifier">Username / Email</label>
              <input id="identifier" name="identifier" type="text" required />
            </div>
            <div className="wrapper-field">
              <label htmlFor="current-password">Password</label>
              <input
                id="current-password"
                name="password"
                type="password"
                required
              />
            </div>
            <button
              type="submit"
              className="button-black"
              style={{
                marginTop: "1rem",
                width: "100%",
              }}
              disabled={isLoading}
            >
              {isLoading ? "Sending request..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
