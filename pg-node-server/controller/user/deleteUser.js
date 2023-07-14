import query from "../../config/dbConfig.js";

const deleteUser = async (req, res) => {
  /* Extracting the value of the `id` parameter from the request
  URL. */
  const user_id = req.params["id"];

  /* SOFT DELETE: 
  Executing an `UPDATE` query to set the `deleted_at` column of the `users` table to the
  current timestamp for the row where the `id` column matches the `user_id` parameter.  */
  await query("UPDATE users SET deleted_at = CURRENT_TIMESTAMP where id = $1", [
    user_id,
  ])
    .then(async () => {
      /* Executing a SELECT query to retrieve the user data from the database after the
      user has been soft-deleted. */
      const user = await query("SELECT * FROM users WHERE id=$1", [
        user_id,
      ]).then((res) => {
        if (res.rowCount > 0) {
          return res.rows[0];
        } else {
          throw res;
        }
      });

      /* Success message */
      const serverRes = {
        message: "User is deleted succesfully!",
        user: user,
      };
      res.status(200).json(serverRes);
    })
    .catch((error) => {
      /* Error handling */
      const serverRes = {
        message: "Error deleting user",
        error: error.message,
      };
      res.status(403).json(serverRes);
    });
};
export default deleteUser;
