import query from "../../config/dbConfig.js";
import "dotenv/config";

const editCustomer = async (req, res) => {
  /* If no validation error, execute database query */
  try {
    /* Extracting the value of the `id` parameter from the
    request URL */
    const customer_id = req.params["id"];

    /* Extract the values from the `req.body` object, sent by the client */
    const updatedInfo = {
      fullname: req.body.fullname,
      gender: req.body.gender,
      birthday: req.body.birthday,
      smoking: req.body.smoking,
      critical_illness: req.body.critical_illness,
      insurance_type: req.body.insurance_type,
      insurance_budget: req.body.insurance_budget,
      email: req.body.email,
      mobile_no: req.body.mobile_no,
      message: req.body.message,
      quotation_sent: req.body.quotation_sent,
    };

    /* The `await query()` function is used to execute a SQL query to update a customer record in the
    database. */
    await query(
      "UPDATE customers SET fullname=$1, gender=$2,  birthday=$3, smoking=$4, critical_illness=$5, insurance_type=$6, insurance_budget=$7, email=$8, mobile_no=$9, quotation_sent=$10  WHERE id=$11",
      [
        updatedInfo["fullname"],
        updatedInfo["gender"],
        updatedInfo["birthday"],
        updatedInfo["smoking"],
        updatedInfo["critical_illness"],
        updatedInfo["insurance_type"],
        updatedInfo["insurance_budget"],
        updatedInfo["email"],
        updatedInfo["mobile_no"],
        updatedInfo["quotation_sent"],
        customer_id,
      ]
    );

    /* Executing a SQL query to select a customer record from the database based on the
    provided `customer_id`. */
    const customer = await query("SELECT * FROM customers WHERE id=$1", [
      customer_id,
    ]).then((res) => {
      if (res.rowCount > 0) {
        return res.rows[0];
      } else {
        throw res;
      }
    });

    /* Success message */
    const serverRes = {
      message: "Customer updated successfully",
      customer: customer,
    };
    res.status(200).json(serverRes);
  } catch (error) {
    /* Error handling */
    const serverRes = {
      message: "Error updating customer",
      error: error.message,
    };
    res.status(403).json(serverRes);
  }
};

export default editCustomer;
