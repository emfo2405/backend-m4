const express = require("express");
const bodyParser = require("body-parser");
const regRoutes = require("./routes/regRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

//Routes
app.use("/api", regRoutes);

//Starta applikationen
app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
})