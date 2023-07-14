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
  const navigate = useNavigate();
  const handleSucesssNavigation = () => {
    navigate("/dashboard");
    window.location.reload();
  };
  const handleErrorNavigation = (message) => {
    alert.show("Error! " + message);
    navigate("/login");
  };
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
        console.log(error.response);
        handleErrorNavigation(error.response.data?.message);
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
          <p
            style={{
              marginTop: "1rem",
              display: "block",
              width: "100%",
              textAlign: "center",
            }}
          >
            Not registered yet?
            <Link to="/register" style={{ marginLeft: "8px" }}>
              Sign Up
            </Link>
          </p>

          {/* {error && error.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "3rem",
                color: "red",
              }}
            >
              {error}
            </div>
          ) : null} */}
          <form
            method="POST"
            style={{ width: "100%", maxWidth: "400px" }}
            onSubmit={handleSubmit}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "3rem",
              }}
            >
              <label htmlFor="identifier">Username / Email</label>
              <input id="identifier" name="identifier" type="text" required />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
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
