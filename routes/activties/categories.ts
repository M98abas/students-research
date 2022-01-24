import * as express from "express";
import WebActionsResponse from "../../controllers/v1/products.controller";
import authCheck from "../../middleware/auth.admin";
const route = express.Router();

// add category
route.post("/", authCheck, WebActionsResponse.addCategory);
route.get("/all/:id", authCheck, WebActionsResponse.getAllOneCategories);

// delete category
route.put("/delete/:id", authCheck, WebActionsResponse.deleteCategory);

// update category
route.put("/update/:id", authCheck, WebActionsResponse.updateCategory);

export default route;
