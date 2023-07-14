import React from "react";
import { useNavigate } from "react-router-dom";
import useSessionStorage from "../hook/useSessionStorage";

const MyAccount = (req, res) => {
  const [user, setUser] = useSessionStorage("userData", null);

  // Handle navigation for edit information button
  const navigate = useNavigate();
  const handleNavigateToEditInformation = () => {
    navigate("/my-account/edit");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="container-my-acc">
        <div className="wrapper-my-acc">
          <p style={{ width: "15%" }}>Username:</p>
          <p style={{ display: "block", fontWeight: "bold" }}>
            {user?.username || "no data"}
          </p>
        </div>
        <div className="my-acc-wrapper-field">
          <p style={{ width: "15%" }}>Email:</p>
          <p style={{ display: "inline", fontWeight: "bold" }}>
            {user?.email || "no data"}
          </p>
        </div>
        <div className="my-acc-wrapper-field">
          <p style={{ width: "15%" }}>Fullname:</p>
          <p style={{ display: "inline", fontWeight: "bold" }}>
            {user?.fullname || "no data"}
          </p>
        </div>
        <div className="my-acc-wrapper-field">
          <p style={{ width: "15%" }}>Admin status:</p>
          <p style={{ display: "inline", fontWeight: "bold" }}>
            {user?.is_admin ? "True" : "False"}
          </p>
        </div>
      </div>
      <button
        className="button-green edit-info-button"
        onClick={handleNavigateToEditInformation}
      >
        Edit information
      </button>
    </div>
  );
};

export default MyAccount;
