import notFound from "../middleware/notFound";
import mainV1 from "../routes/main";
import cors from "cors";
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());
// route of users
app.use("/v1", mainV1);

// not found route
app.use(notFound);

export default app;
