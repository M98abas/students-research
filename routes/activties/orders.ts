import * as express from "express";
import WebActionsResponse from "../../controllers/v1/orders.controller";
import authAdminCheck from "../../middleware/auth.admin";
import authCustCheck from "../../middleware/auth.cust";
const route = express.Router();

// get all orders
route.get("/", authAdminCheck, WebActionsResponse.getAll);

// get one orders
route.get("/:id", authAdminCheck, WebActionsResponse.getOne);

// get one orders
route.get("/:id", authCustCheck, WebActionsResponse.getMyOrders);

// add orders
route.post("/", authCustCheck, WebActionsResponse.add);

// delete orders
route.put("/delete/:id", authAdminCheck, WebActionsResponse.delete);

// update orders
route.put("/update/:id", authAdminCheck, WebActionsResponse.update);

export default route;
