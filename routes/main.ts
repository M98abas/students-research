import productsRoute from "./activties/products";
import categoriesRoute from "./activties/categories";
import adminRoute from "./web/admin";
import customersRoute from "./web/customers";
import ordersRoute from "./activties/orders";
const express = require("express");

const route = express.Router();

// product route
route.use("/product", productsRoute);
// orders
route.use("/orders", ordersRoute);
// category
route.use("/category", categoriesRoute);
// admin
route.use("/admin", adminRoute);

// customers
route.use("/customer", customersRoute);

export default route;
