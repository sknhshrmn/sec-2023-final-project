import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { HOST } from "../api";
import useSessionStorage from "../hook/useSessionStorage";
import Header from "../components/Header";
import { useAlert } from "react-alert";

const EditMyAccount = (req, res) => {
  const alert = useAlert();
  const [jwt, setJwt] = useSessionStorage("access_token", "");
  const [user, setUser] = useSessionStorage("userData", null);
  const [isLoading, setLoading] = useState(false);

  // Handle navigation of submit button and cancel button
  const navigate = useNavigate();
  const handleSucesssNavigation = () => {
    alert.show("Account updated successfully!");
    navigate("/dashboard");
  };
  const handleCancelNavigation = () => {
    navigate("/dashboard");
  };

  // Handle submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    const email = event.target[1].value;
    const fullname = event.target[2].value;

    // send formObject to api
    setLoading(true);
    // async function then = Promise:resolved, catch = Promise:reject, finally = Promise:fetched
    const instance = axios
      .put(
        `${HOST}/api/my-account/edit`,
        {
          username,
          email,
          fullname,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(function (response) {
        setUser(response.data.userData);
        setJwt(response.data.access_token);
        handleSucesssNavigation();
      })
      .catch(function (error) {
        console.log(error.response);
      })
      .finally(function () {
        setLoading(false);
      });
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ marginBottom: "5rem" }}>
        <Header />
        <div className="container-edit-my-acc">
          <div id="edit-my-account">
            <h1 className="greeting">Edit My Account</h1>
            <div className="wrapper-form">
              <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <div
                  className="wrapper-field"
                  style={{
                    marginTop: "3rem",
                  }}
                >
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    defaultValue={user?.username}
                    placeholder={user?.username}
                  />
                </div>
                <div className="wrapper-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={user?.email}
                    required
                  />
                </div>
                <div className="wrapper-field">
                  <label htmlFor="fullname">Fullname</label>
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    defaultValue={user?.fullname}
                    required
                  />
                </div>
                <div className="group-button">
                  <button
                    name="cancel"
                    value="cancel"
                    className="button-white"
                    onClick={handleCancelNavigation}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="button-green"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending request..." : "Save"}
                  </button>
                </div>
                {/* Hint */}
                <div className="hint">
                  <div style={{ fontWeight: "bold" }}>Hint:</div>
                  <p>Username - At least 4 characters</p>
                  <p>Email - Must be valid email address</p>
                  <p>Fullname - At least 4 characters</p>
                  {/* <p>Password - At least 8 characters</p> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMyAccount;
