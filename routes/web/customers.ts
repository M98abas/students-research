import * as express from "express";
import customerController from "../../controllers/v1/customer.controller";
const route = express.Router();

// register
route.post("/register", customerController.rigister);
// login user
route.post("/login", customerController.login);

export default route;
