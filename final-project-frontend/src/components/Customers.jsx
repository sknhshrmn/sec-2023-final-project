import React, { useEffect, useState, useRef } from "react";
import { HOST } from "../api";
import useSessionStorage from "../hook/useSessionStorage";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { forwardRef } from "react";
import axios from "axios";
import { FaSmoking } from "react-icons/fa";
import { GrUser, GrUserFemale } from "react-icons/gr";

// Neccessary for material-table
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

// Neccessary for material-table
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

const Customers = (req, res) => {
  const defaultMaterialTheme = createTheme();
  const [jwt, setJwt] = useSessionStorage("access_token", "");
  const [user, setUser] = useSessionStorage("userData", null);
  const [isAdmin, setIsAdmin] = useState(user.is_admin);
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  // Define columns
  const columns = [
    {
      field: "id",
      title: "ID",
      editable: "never",
    },
    {
      field: "quotation_sent",
      title: "Quotation Sent",
      type: "boolean",
      sorting: false,
      render: (rowdata) => (rowdata.quotation_sent ? <Check /> : <Remove />),
    },
    {
      field: "created_at",
      title: "Request Date",
      type: "date",
      editable: "never",
    },
    {
      field: "fullname",
      title: "Fullname",
      // editComponent: (props) => (
      //   <input
      //     type="text"
      //     value={props.value}
      //     onChange={(e) => props.onChange(e.target.value)}
      //   />
      // ),
    },
    {
      field: "insurance_type",
      title: "Insurance Type",
      type: "text",
      lookup: { Hibah: "Hibah", Takaful: "Takaful" },
      sorting: false,
      initialEditValue: "Hibah",
    },
    {
      field: "insurance_budget",
      title: "Insurance Budget",
      type: "text",
      lookup: {
        RM150: "RM150*",
        RM200: "RM200*",
        RM300: "RM300*",
        RM350: "RM350*",
        RM400: "RM400*",
        RM450: "RM450*",
        RM500: "RM500*",
      },
      sorting: false,
      initialEditValue: "RM150",
    },
    {
      field: "message",
      title: "Message",
      type: "text",
      editable: "never",
      cellStyle: {
        width: 500,
        maxWidth: 500,
        wordWrap: "break-word",
      },
      sorting: false,
      render: (rowdata) => (rowdata.message ? rowdata.message : <Remove />),
      // editComponent: (props) => (
      //   <input
      //     style={{ padding: "10px" }}
      //     type="text"
      //     value={props.value}
      //     onChange={(e) => props.onChange(e.target.value)}
      //   />
      // ),
    },
    {
      field: "email",
      title: "Email",
      type: "text",
      sorting: false,
      // editComponent: (props) => (
      //   <input
      //     style={{ padding: "10px" }}
      //     type="text"
      //     value={props.value}
      //     onChange={(e) => props.onChange(e.target.value)}
      //   />
      // ),
    },
    {
      field: "mobile_no",
      title: "Mobile Number",
      type: "text",
      sorting: false,
      // editComponent: (props) => (
      //   <input
      //     style={{ padding: "10px" }}
      //     type="text"
      //     value={props.value}
      //     onChange={(e) => props.onChange(e.target.value)}
      //   />
      // ),
    },

    {
      field: "gender",
      title: "Gender",
      enableSorting: false,
      lookup: { Male: <GrUser />, Female: <GrUserFemale /> },
      sorting: false,
      initialEditValue: "Male",
      render: (rowdata) =>
        rowdata.gender === "Male" ? <GrUser /> : <GrUserFemale />,
    },
    {
      field: "birthday",
      title: "Birth Date",
      type: "date",
      sorting: false,
      editable: "onUpdate",
      // editComponent: (props) => (
      //   <input
      //     style={{ padding: "10px" }}
      //     type="date"
      //     value={props.value}
      //     onChange={props.onChange}
      //   />
      // ),
    },
    {
      field: "smoking",
      title: <FaSmoking />,
      type: "boolean",
      render: (rowdata) => (rowdata.smoking ? <Check /> : <Remove />),
      sorting: false,
      initialEditValue: false,
    },
    {
      field: "critical_illness",
      title: "Critical Illness",
      cellStyle: {
        width: 200,
        maxWidth: 200,
        wordWrap: "break-word",
      },
      type: "text",
      sorting: false,
      render: (rowdata) =>
        rowdata.critical_illness ? rowdata.critical_illness : <Remove />,
      // editComponent: (props) => (
      //   <input
      //     style={{ padding: "10px" }}
      //     type="text"
      //     value={props.value}
      //     onChange={(e) => props.onChange(e.target.value)}
      //   />
      // ),
    },
  ];

  //JSON data from RESTful API
  const fetchAllCustomers = async () => {
    // get jwt from localStorage
    // run get api
    const customer = await axios
      .get(`${HOST}/api/customers`, {
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
        setErrorMessages(["Cannot load customer data"]);
        setIserror(true);
      })
      .finally(function () {
        // always executed
      });
  };
  useEffect(() => {
    fetchAllCustomers();
  }, [jwt]);

  // Validate email
  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  };

  // Handle Add button for each row
  const handleRowAdd = async (newData, resolve) => {
    //validation
    let errorList = [];
    if (newData.fullname === undefined) {
      errorList.push("Please enter fullname");
    }
    if (newData.gender === undefined) {
      errorList.push("Please enter gender");
    }
    if (newData.birthday === undefined) {
      errorList.push("Please enter birthday");
    }
    if (newData.insurance_type === undefined) {
      errorList.push("Please enter insurance type");
    }
    if (newData.insurance_budget === undefined) {
      errorList.push("Please enter insurance budget");
    }
    if (newData.email === undefined || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email");
    }
    if (newData.mobile_no === undefined) {
      errorList.push("Please enter mobile no");
    }
    if (errorList.length < 1) {
      //no error
      const instance = await axios
        .post(`${HOST}/api/customers/create`, newData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
        })
        .catch((error) => {
          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          resolve();
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
    if (newData.fullname === undefined) {
      errorList.push("Please enter fullname");
    }
    if (newData.gender === undefined) {
      errorList.push("Please enter gender");
    }
    if (newData.birthday === undefined) {
      errorList.push("Please enter birthday");
    }
    if (newData.insurance_type === undefined) {
      errorList.push("Please enter insurance type");
    }
    if (newData.insurance_budget === undefined) {
      errorList.push("Please enter insurance budget");
    }
    if (newData.email === undefined || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email");
    }
    if (newData.mobile_no === undefined) {
      errorList.push("Please enter mobile no");
    }
    if (errorList.length < 1) {
      const instance = await axios
        .put(`${HOST}/api/customers/${newData.id}/edit`, newData, {
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
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
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
      .delete(`${HOST}/api/customers/${oldData.id}/delete`, {
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
        // padding: "1rem",
        marginTop: "1rem",
      }}
    >
      <div style={{ height: 400, width: "100%" }}>
        <ThemeProvider theme={defaultMaterialTheme}>
          {isAdmin ? (
            <MaterialTable
              title="Customers"
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
          ) : (
            <MaterialTable
              title="Customers"
              columns={columns}
              data={data}
              icons={tableIcons}
              options={{
                pageSize: 5,
                pageSizeOptions: [5, 10, 25, 50, 100],
                sorting: true,
              }}
            />
          )}
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Customers;
