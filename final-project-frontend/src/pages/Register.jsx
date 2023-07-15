import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { HOST } from "../api";
import useSessionStorage from "../hook/useSessionStorage";
import { useAlert } from "react-alert";

const Register = (req, res, next) => {
  const alert = useAlert();
  const [isLoading, setLoading] = useState(false);
  const [jwt, setJwt] = useSessionStorage("access_token", "");

  const navigate = useNavigate();
  const handleSucesssNavigation = () => {
    alert.show("Account registered successfully!");
    navigate("/dashboard");
    window.location.reload();
  };
  const handleErrorNavigation = (message) => {
    alert.show("Error! " + message);
    navigate("/register");
  };

  const handleSubmit = async (event) => {
    // console.log(event);
    event.preventDefault();

    const fullname = event.target[0].value;
    const username = event.target[1].value;
    const email = event.target[2].value;
    const password = event.target[3].value;

    setLoading(true);

    // send formObject to api
    const instance = await axios
      .post(`${HOST}/api/register`, {
        fullname,
        username,
        email,
        password,
      })
      .then(function (response) {
        // send Object to api
        setJwt(response.data.access_token);
        handleSucesssNavigation();
      })
      .catch(function (err) {
        handleErrorNavigation(err.response.data.serverRes.message);
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
            alignItems: "center",
          }}
        >
          <h1 class="title">Sign Up</h1>
          <p
            style={{
              marginTop: "1rem",
              display: "block",
              width: "100%",
              textAlign: "center",
            }}
          >
            Already have an account?
            <Link to="/login" style={{ marginLeft: "8px" }}>
              Sign In
            </Link>
          </p>

          <form
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
              <label htmlFor="fullname">Fullname *</label>
              <input id="fullname" type="text" required />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <label htmlFor="username">Username *</label>
              <input id="username" type="text" autoCapitalize="none" required />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <label htmlFor="email">Email *</label>
              <input id="email" type="email" required />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <label htmlFor="password">Password *</label>
              <input id="password" type="password" required />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <label htmlFor="passwordConfirmation">Repeat password *</label>
              <input id="passwordConfirmation" type="password" required />
            </div>
            <button
              type="submit"
              class="button-black"
              style={{
                marginTop: "1rem",
                width: "100%",
              }}
              disabled={isLoading}
            >
              {isLoading ? "Sending request..." : "Register"}
            </button>
            {/* Hint */}
            <div className="hint">
              <div style={{ fontWeight: "bold" }}>Hint:</div>
              <p>Fullname - At least 4 characters</p>
              <p>Username - At least 4 characters</p>
              <p>Email - Must be valid email address</p>
              <p>Password - At least 8 characters</p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
