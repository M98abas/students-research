import * as express from "express";
import WebActionsResponse from "../../controllers/v1/products.controller";
import authCheck from "../../middleware/auth.admin";
const route = express.Router();

// get all products
route.get("/categories", WebActionsResponse.getAllCategories);
route.get("/", WebActionsResponse.getAll);


// get one products
route.get("/:id", WebActionsResponse.getOneProducts);

// add products
route.post("/", authCheck, WebActionsResponse.addProducts);

// delete products
route.put("/delete/:id", authCheck, WebActionsResponse.deleteProducts);

// update products
route.put("/update/:id", authCheck, WebActionsResponse.updateProducts);

export default route;
