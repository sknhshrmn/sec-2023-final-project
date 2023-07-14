import React from "react";
import { useNavigate, Link } from "react-router-dom";
import useSessionStorage from "../hook/useSessionStorage";

const MyAccount = (req, res) => {
  const [user, setUser] = useSessionStorage("userData", null);
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
      <div
        style={{
          minWidth: "70%",
          width: "100%",
          borderWidth: "1px",
          borderColor: "#b5b0b0",
          borderStyle: "solid",
          borderRadius: "0.5rem",
          marginTop: "3rem",
          padding: "1rem",
          alignSelf: "center",
        }}
      >
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "3rem",
          }}
        >
          <p style={{ width: "15%" }}>Username:</p>
          <p style={{ display: "block", fontWeight: "bold" }}>
            {user?.username || "no data"}
          </p>
        </div>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "3rem",
          }}
        >
          <p style={{ width: "15%" }}>Email:</p>
          <p style={{ display: "inline", fontWeight: "bold" }}>
            {user?.email || "no data"}
          </p>
        </div>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "3rem",
          }}
        >
          <p style={{ width: "15%" }}>Fullname:</p>
          <p style={{ display: "inline", fontWeight: "bold" }}>
            {user?.fullname || "no data"}
          </p>
        </div>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "3rem",
          }}
        >
          <p style={{ width: "15%" }}>Admin status:</p>
          <p style={{ display: "inline", fontWeight: "bold" }}>
            {user?.is_admin ? "True" : "False"}
          </p>
        </div>
      </div>
      <button
        className="button-green"
        style={{
          marginTop: "3rem",
          paddingRight: "3rem",
          paddingLeft: "3rem",
          fontSize: "1rem",
          width: "fit-content",
          alignSelf: "center",
        }}
        onClick={handleNavigateToEditInformation}
      >
        Edit information
      </button>
    </div>
  );
};

export default MyAccount;
