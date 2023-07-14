import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST } from "../api";
import useSessionStorage from "../hook/useSessionStorage";
import { useAlert } from "react-alert";

const GetQuote = () => {
  const alert = useAlert();
  const [isLoading, setLoading] = useState(false);
  const [jwt, setJwt] = useSessionStorage("access_token", "");
  const [smoking, setSmoking] = useState(false);

  // Default value of forms
  const [formValues, setFormValues] = useState({
    fullname: "",
    gender: "Male",
    birthday: "",
    str_smoking: "False",
    critical_illness: "",
    insurance_type: "Takaful",
    insurance_budget: "RM100-RM200",
    email: "",
    mobile_no: "",
    message: "",
  });

  // Handle navigation of success form submission
  const navigate = useNavigate();
  const handleSucesssNavigation = () => {
    alert.show("Request submitted!");
    setFormValues({
      fullname: "",
      gender: "Male",
      birthday: "",
      str_smoking: "False",
      critical_illness: "",
      insurance_type: "Takaful",
      insurance_budget: "RM100-RM200",
      email: "",
      mobile_no: "",
      message: "",
    });
    navigate("/");
  };

  // Handle navigation of error during form submission
  const handleErrorNavigation = () => {
    alert.show("Error");
    navigate("/#quotation");
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event);
    const fullname = event.target[0].value;
    const gender = event.target[1].value;
    const birthday = event.target[2].value;

    if (event.target[3].value === "True") {
      setSmoking(true);
    }

    const critical_illness = event.target[4].value;
    const insurance_type = event.target[5].value;
    const insurance_budget = event.target[6].value;
    const email = event.target[7].value;
    const mobile_no = event.target[8].value;
    const message = event.target[9].value;
    const quotation_sent = false;

    // send formObject to api
    setLoading(true);
    // async function then = Promise:resolved, catch = Promise:reject, finally = Promise:fetched
    const instance = axios
      .post(
        `${HOST}/api/customers/create`,
        {
          fullname,
          gender,
          birthday,
          smoking,
          critical_illness,
          insurance_type,
          insurance_budget,
          email,
          mobile_no,
          message,
          quotation_sent,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        handleSucesssNavigation();
      })
      .catch(function (error) {
        console.log(error.response);
        handleErrorNavigation();
      })
      .finally(function () {
        setLoading(false);
      });
  };

  return (
    <div id={"quotation"} style={{ backgroundColor: "#070707", width: "100%" }}>
      <div
        className="container"
        style={{
          backgroundColor: "#070707",
        }}
      >
        <div
          style={{
            marginLeft: "4rem",
            marginRight: "4rem",
            width: "100%",
            backgroundColor: "#B5B0B0",
            margin: "5rem",
            padding: "1.5rem",
          }}
        >
          <h1 className="title">Request A Quote</h1>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="container-form">
              <div className="form-left">
                {/* Fullname */}
                <input
                  id="fullname"
                  type="text"
                  placeholder="Fullname *"
                  value={formValues.fullname}
                  onChange={(e) =>
                    setFormValues({ ...formValues, fullname: e.target.value })
                  }
                  required
                />
                {/* Gender */}
                <div className="quotation-form-wrapper-field">
                  <label htmlFor="gender">Gender *</label>
                  <select
                    id="gender"
                    type="text"
                    value={formValues.gender}
                    onChange={(e) =>
                      setFormValues({ ...formValues, gender: e.target.value })
                    }
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                {/* Birthday */}
                <input
                  id="birthday"
                  type="date"
                  placeholder="Birthday *"
                  value={formValues.birthday}
                  onChange={(e) =>
                    setFormValues({ ...formValues, birthday: e.target.value })
                  }
                  required
                />
                {/* Smoking */}
                <div className="quotation-form-wrapper-field">
                  <label htmlFor="str_smoking">Smoking? *</label>
                  <select
                    id="str_smoking"
                    type="text"
                    value={formValues.str_smoking}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        str_smoking: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="True">Yes</option>
                    <option value="False">No</option>
                  </select>
                </div>
                {/* Critical illness */}
                <div className="quotation-form-wrapper-field">
                  <label htmlFor="critical_illness">
                    Critical illness (if any):
                  </label>
                  <input
                    id="critical_illness"
                    type="text"
                    style={{ backgroundColor: "white" }}
                    value={formValues.critical_illness}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        critical_illness: e.target.value,
                      })
                    }
                  />
                </div>
                {/* Insurance Type */}
                <div className="quotation-form-wrapper-field">
                  <label htmlFor="insurance_type">Insurance Type *:</label>
                  <select
                    id="insurance_type"
                    type="text"
                    value={formValues.insurance_type}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        insurance_type: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="Takaful">Takaful</option>
                    <option value="Hibah">Hibah</option>
                  </select>
                </div>
                {/* Insurance budget */}
                <div className="quotation-form-wrapper-field">
                  <label htmlFor="insurance_budget">Insurance Budget *:</label>
                  <select
                    id="insurance_budget"
                    type="text"
                    value={formValues.insurance_budget}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        insurance_budget: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="RM150">RM150*</option>
                    <option value="RM200">RM200*</option>
                    <option value="RM250">RM250*</option>
                    <option value="RM300">RM300*</option>
                    <option value="RM350">RM350*</option>
                    <option value="RM400">RM400*</option>
                    <option value="RM450">RM450*</option>
                    <option value="RM500">RM500*</option>
                  </select>
                </div>
              </div>
              <div className="form-right">
                {/* Email */}
                <input
                  id="email"
                  type="email"
                  placeholder="Email *"
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      email: e.target.value,
                    })
                  }
                  required
                />
                {/* Mobile No. */}
                <input
                  id="mobile_no"
                  type="text"
                  placeholder="Mobile No. *"
                  value={formValues.mobile_no}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      mobile_no: e.target.value,
                    })
                  }
                  required
                />
                {/* Message */}
                <div className="quotation-form-wrapper-field">
                  <label htmlFor="message">Message (optional):</label>
                  <textarea
                    id="message"
                    type="text"
                    rows="10"
                    style={{
                      padding: "0.5rem",
                    }}
                    value={formValues.message}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        message: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="button-yellow"
              disabled={isLoading}
            >
              {isLoading ? "Sending request..." : "Request quote"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetQuote;
