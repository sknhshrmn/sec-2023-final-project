import query from "../../config/dbConfig.js";

const deleteCustomer = async (req, res) => {
  /* Extracting the value of the `id` parameter from the
  request URL. */
  const customer_id = req.params["id"];

  /* SOFT DELETE: Executing an SQL query to update the `deleted_at` column of the
  `customers` table in the database.  */
  await query(
    "UPDATE customers SET deleted_at = CURRENT_TIMESTAMP where id = $1",
    [customer_id]
  )
    .then(async () => {
      /* Executing a SQL query to select all columns from the `customers` table where the
      `id` column matches the `customer_id` value. */
      const customer = await query("SELECT * FROM customers WHERE id=$1", [
        customer_id,
      ]).then((res) => {
        if (res.rowCount > 0) {
          return res.rows[0];
        } else {
          throw res;
        }
      });

      /* Succces message */
      const serverRes = {
        message: "Customer is deleted succesfully!",
        customer: customer,
      };
      res.status(200).json(serverRes);
    })
    .catch((error) => {
      /* Error handling */
      const serverRes = {
        message: "Error deleting customer",
        error: error.message,
      };
      res.status(403).json(serverRes);
    });
};

export default deleteCustomer;
