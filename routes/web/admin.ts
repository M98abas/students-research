import AdminController from "../../controllers/v1/admin.controller";
import authCheck from "../../middleware/auth.admin";
import * as express from "express";
const route = express.Router();

// get all cust
route.get("/customers/all", authCheck, AdminController.getAllCoustomers);
// get all users
route.get("/all", authCheck, AdminController.getAllUsers);
// register
route.post("/register", AdminController.rigister);
// login user
route.post("/login", AdminController.login);

export default route;
