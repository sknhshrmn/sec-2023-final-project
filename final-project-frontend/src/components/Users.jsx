import { React, useEffect, useState } from "react";
import { HOST } from "../api";
import useSessionStorage from "../hook/useSessionStorage";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { forwardRef } from "react";
import axios from "axios";
import { useAlert } from "react-alert";

// Necessary for material-table
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

// Necessary for material-table
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const Users = (req, res) => {
  const defaultMaterialTheme = createTheme();
  const alert = useAlert();
  const [jwt, setJwt] = useSessionStorage("access_token", "");
  //Initialize table data
  const [data, setData] = useState([]);

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  // Define columns
  const columns = [
    { field: "id", title: "ID", width: 70, editable: "never", hidden: true },
    { field: "username", title: "Username", width: 130 },
    { field: "email", title: "Email", width: 130, sorting: false },
    {
      field: "fullname",
      title: "Fullname",
      sorting: false,
      width: 160,
    },
    {
      field: "password",
      title: "Password",
      hidden: true,
      width: 160,
    },
    {
      field: "is_admin",
      title: "Admin status",
      type: "boolean",
      render: (rowdata) => (rowdata.is_admin ? <Check /> : <Remove />),
      sorting: false,
      width: 60,
    },
  ];

  //JSON data from RESTful API
  const fetchAllusers = async () => {
    // get jwt from localStorage
    // run get api
    const data = await axios
      .get(`${HOST}/api/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then(function (response) {
        // handle success
        console.info(response.data);
        setData(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setErrorMessages(["Cannot load user data"]);
        setIserror(true);
      })
      .finally(function () {
        // always executed
      });
  };

  useEffect(() => {
    fetchAllusers();
  }, [jwt]);

  // Validate email
  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  };

  // Handle Add button for each row
  const handleRowAdd = async (newData, resolve) => {
    //validation
    let errorList = [];
    if (newData.username === undefined) {
      errorList.push("Please enter username");
    }
    if (newData.email === undefined || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email");
    }
    // if (newData.password === undefined) {
    //   errorList.push("Please enter password");
    // }
    if (newData.fullname === undefined) {
      errorList.push("Please enter fullname");
    }
    if (newData.is_admin === undefined) {
      errorList.push("Please set admin status");
    }
    if (errorList.length < 1) {
      //no error

      newData.password = "abcd1234"; /* Set the default password */
      const instance = await axios
        .post(
          `${HOST}/api/register`,
          {
            fullname: newData.fullname,
            username: newData.username,
            email: newData.email,
            password: newData.password,
            is_admin: newData.is_admin,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((res) => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
          alert.show("Default password is 'abcd1234'");
        })
        .catch((error) => {
          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          resolve();
          alert.show(error);
        })
        .finally(function () {
          console.log("Add done");
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  // Handle Update button for each row
  const handleRowUpdate = async (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (newData.username === undefined) {
      errorList.push("Please enter username");
    }
    if (newData.email === undefined || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email");
    }

    if (newData.fullname === undefined) {
      errorList.push("Please enter fullname");
    }
    if (errorList.length < 1) {
      const instance = await axios
        .put(`${HOST}/api/users/${newData.id}/edit`, newData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
          alert.show("Default password is 'abcd1234'");
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          alert.show("Error!" + error.response?.data?.serverRes.message);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  // Handle Delete button for each row
  const handleRowDelete = async (oldData, resolve) => {
    const instance = await axios
      .delete(`${HOST}/api/users/${oldData.id}/delete`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  return (
    <div
      style={{
        marginTop: "1rem",
      }}
    >
      <div style={{ height: 400, width: "100%" }}>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            title="Users"
            columns={columns}
            data={data}
            icons={tableIcons}
            options={{
              pageSize: 5,
              pageSizeOptions: [5, 10, 25, 50, 100],
              sorting: true,
            }}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);
                }),
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  handleRowAdd(newData, resolve);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  handleRowDelete(oldData, resolve);
                }),
            }}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Users;
