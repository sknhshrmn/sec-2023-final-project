import express from "express";
import cors from "cors";
import { body, check } from "express-validator";
import isAuthenticated from "./middleware/isAuthenticated.js";
import isAdmin from "./middleware/isAdmin.js";
import validatorResponse from "./middleware/validatorResponse.js";
import checkStatus from "./controller/health/checkStatus.js";
import register from "./controller/auth/register.js";
import login from "./controller/auth/login.js";
import logout from "./controller/auth/logout.js";
import editMyAccount from "./controller/user/editMyAccount.js";
import listAllUsers from "./controller/user/listAllUsers.js";
import editUser from "./controller/user/editUser.js";
import deleteUser from "./controller/user/deleteUser.js";
import listAllCustomers from "./controller/customer/listAllCustomers.js";
import createNewCustomer from "./controller/customer/createNewCustomer.js";
import editCustomer from "./controller/customer/editCustomer.js";
import deleteCustomer from "./controller/customer/deleteCustomer.js";

const app = express();
app.use(express.json()); // Parses details from a form
app.use(cors());

// PUBLIC ROUTES
// 1. Check server status
app.get("/", checkStatus);
// 2. Public route
app.get("/public", (req, res) =>
  res.status(200).json({ message: "Public route" })
);
// 3. Register route
app.post(
  "/api/register",
  check("username").notEmpty().bail().isLength({ min: 4 }).bail(),
  check("email").notEmpty().bail().isEmail().bail(),
  check("password").notEmpty().bail().isLength({ min: 8 }).bail(),
  check("fullname").notEmpty().bail().isLength({ min: 4 }).bail(),
  validatorResponse,
  register
);
// 4. Login route
app.post(
  "/api/login",
  check("identifier").notEmpty().bail(),
  check("password").notEmpty().bail(),
  validatorResponse,
  login
);
// 5. Add a new customer / Request quote
app.post(
  "/api/customers/create",
  check("fullname").notEmpty().bail(),
  check("gender").notEmpty().bail(),
  check("birthday").notEmpty().bail().isDate().bail(),
  check("smoking").notEmpty().bail().isBoolean().bail(),
  check("critical_illness").exists().bail(),
  check("insurance_type").notEmpty().bail(),
  check("insurance_budget").notEmpty().bail(),
  check("email").notEmpty().bail().isEmail().bail(),
  check("mobile_no").notEmpty().bail(),
  check("message").exists().bail(),
  check("quotation_sent").notEmpty(),
  validatorResponse,
  createNewCustomer
);

// PRIVATE ROUTES
// 1. Protected route / Private route
app.get("/private", isAuthenticated, (req, res) => {
  res.status(200).json({
    message: "You have accessed a private route",
    userData: req.user,
  });
});
// 2. Edit my account information
app.put(
  "/api/my-account/edit",
  isAuthenticated,
  check("username").notEmpty().bail(),
  check("email").notEmpty().bail().isEmail().bail(),
  check("fullname").notEmpty().bail(),
  validatorResponse,
  editMyAccount
);
// 3. List all customers
app.get("/api/customers", isAuthenticated, listAllCustomers);
// 4. Edit a customer
app.put(
  "/api/customers/:id/edit",
  isAuthenticated,
  check("fullname").notEmpty().bail(),
  check("gender").notEmpty().bail(),
  check("birthday").notEmpty().bail().isDate().bail(),
  check("smoking").notEmpty().bail().isBoolean().bail(),
  check("critical_illness").exists().bail(),
  check("insurance_type").notEmpty().bail(),
  check("insurance_budget").notEmpty().bail(),
  check("email").notEmpty().bail().isEmail().bail(),
  check("mobile_no").notEmpty().bail(),
  check("message").exists().bail(),
  check("quotation_sent").notEmpty().isBoolean().bail(),
  validatorResponse,
  editCustomer
);
// 5. Delete a customer
app.delete("/api/customers/:id/delete", isAuthenticated, deleteCustomer);
// // Download information of a customer
// app.get("/api/users/download/:id", isAuthenticated, downloadUserInfo);
// 6. Admin route
app.get("/admin", isAuthenticated, isAdmin, (req, res) =>
  res.status(200).json({ message: "Admin route", user: req.user })
);
// 7. List all users
app.get("/api/users", isAuthenticated, isAdmin, listAllUsers);
// 8. Edit a user
app.put(
  "/api/users/:id/edit",
  isAuthenticated,
  isAdmin,
  check("username").notEmpty().bail().isLength({ min: 4 }).bail(),
  check("email").notEmpty().bail().isEmail().bail(),
  check("fullname").notEmpty().bail().isLength({ min: 4 }).bail(),
  check("is_admin").notEmpty().bail().isBoolean().bail(),
  validatorResponse,
  editUser
);
// 9. Delete a user
app.delete("/api/users/:id/delete", isAuthenticated, isAdmin, deleteUser);
// // Detail view of a user
// app.get("/api/users/:username", isAuthenticated, view);
// 10. Logout route1
app.get("/api/logout", isAuthenticated, logout);

export default app;
