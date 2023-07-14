import query from "../../config/dbConfig.js";

const listAllUsers = async (req, res) => {
  /* If no validation error, execute database query */
  try {
    /* Executing a database query to retrieve all the users from the "users" table where
    the "deleted_at" column is NULL.  */
    const dbRes = await query(
      "SELECT id, username, email, password, fullname, is_admin, created_at FROM users WHERE deleted_at IS NULL"
    );

    /* Success message */
    const serverRes = {
      message: `${dbRes.rowCount} users are found`,
      data: dbRes.rows,
    };
    res.status(200).json(serverRes);
  } catch (error) {
    /* Error handling */
    const serverRes = {
      message: "Error listing all users",
      error: error.message,
    };
    res.status(403).json(serverRes);
  }
};
export default listAllUsers;
