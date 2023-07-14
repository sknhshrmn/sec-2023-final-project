import query from "../../config/dbConfig.js";

const listAllCustomers = async (req, res) => {
  /* If no validation error, execute database query */
  try {
    /* Executing a database query to retrieve data from the "customers" table. */
    const dbRes = await query(
      "SELECT id, fullname, gender, birthday, smoking, critical_illness, insurance_type, insurance_budget, email, mobile_no, message, quotation_sent, created_at FROM customers WHERE deleted_at IS NULL"
    );

    /* Success message */
    const serverRes = {
      message: `${dbRes.rowCount} customers are found`,
      data: dbRes.rows,
    };
    res.status(200).json(serverRes);
  } catch (error) {
    /* Error handling */
    const serverRes = {
      message: "Error listing all customers",
      error: error.message,
    };
    res.status(403).json(serverRes);
  }
};

export default listAllCustomers;
