import query from "../../config/dbConfig.js";

const createNewCustomer = async (req, res) => {
  /* If no validation error, execute database query */
  try {
    /* Destructuring to extract specific properties from the `req.body` object. */
    const {
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
    } = req.body;

    /* Set quotation_sent false by default */
    const quotation_sent = false;

    /* Executing a database query to insert a new customer
    record into the "customers" table. */
    const dbRes = await query(
      "INSERT INTO customers (fullname, gender, birthday, smoking, critical_illness, insurance_type, insurance_budget, email, mobile_no, message, quotation_sent) VALUES ($1, $2, $3,$4,$5, $6,$7,$8,$9,$10,$11)",
      [
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
      ]
    ).then(
      async () =>
        /* Executing a database query to select all columns from the "customers" 
        table where the fullname column matches the value of the `fullname` variable.  
        */
        await query("SELECT * FROM customers WHERE fullname=$1", [fullname])
    );

    /* Success message */
    const newCustomer = dbRes.rows[0];
    const serverRes = {
      message: "A customer created succesfully",
      customer: newCustomer,
    };
    res.status(200).json({ serverRes });
  } catch (error) {
    /* Error handling */
    // console.log(error.message);
    const serverRes = {
      message: "Invalid request",
      error: error.message,
    };
    res.status(403).json(serverRes);
    /* Duplicated request of quotation with the same name is permitted */
    // if (
    //   e.message ===
    //   'Duplicate key value violates unique constraint "customers_username_key"'
    // ) {
    //   const serverRes = {
    //     message: "Fullname already exists ",
    //   };
    //   res.status(403).json({ serverRes });
    // }
  }
};

export default createNewCustomer;
