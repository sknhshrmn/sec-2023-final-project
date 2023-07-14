import query from "../../config/dbConfig.js";
import "dotenv/config";

const editUser = async (req, res) => {
  /* Extracting the `id` property from the `req.user` object */
  const user_id = req.params["id"];

  /* Creating an object called `updatedInfo` that contains the updated values for the
  username, email, fullname, adn is_admin properties, extracted from the `req.body` object */
  const updatedInfo = {
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
    is_admin: req.body.is_admin,
  };

  /* If no validation error, execute database query */
  try {
    /* Executing an SQL query to update the `users` table inv the database. */
    await query(
      "UPDATE users SET username=$1, email=$2,  fullname=$3, is_admin=$4 WHERE id=$5",
      [
        updatedInfo["username"],
        updatedInfo["email"],
        updatedInfo["fullname"],
        updatedInfo["is_admin"],
        user_id,
      ]
    );

    /* Executing an SQL query to select all columns (`*`) from the `users` table 
    where the `id` column matches the `user_id` variable. */
    const user = await query("SELECT * FROM users WHERE id=$1", [user_id]).then(
      (res) => {
        if (res.rowCount > 0) {
          return res.rows[0];
        } else {
          throw res;
        }
      }
    );

    /* Success message */
    const serverRes = {
      message: "User updated successfully",
      user: user,
    };
    res.status(200).json(serverRes);
  } catch (error) {
    /* Error handling */
    // console.log(error.message);
    if (
      error.message ===
      'duplicate key value violates unique constraint "users_username_key"'
    ) {
      const serverRes = {
        message: "Username already exists.",
      };
      res.status(403).json({ serverRes });
    } else if (
      error.message ===
      'duplicate key value violates unique constraint "users_email_key"'
    ) {
      const serverRes = {
        message: "Email already exists.",
      };
      res.status(403).json({ serverRes });
    } else {
      const serverRes = {
        message: "Error updating user",
        error: error.message,
      };
      res.status(403).json(serverRes);
    }
  }
};

export default editUser;
