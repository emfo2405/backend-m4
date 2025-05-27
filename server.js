const express = require("express");
const bodyParser = require("body-parser");
const regRoutes = require("./routes/regRoutes");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());



//Routes
app.use("/api", regRoutes);

const db = new sqlite3.Database(process.env.DATABASE);




//Skyddad route
app.get("/api/secret", authenticateToken, (req, res) => {
    res.json({message: "skyddad route"})
});

//Validera token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null ) res.status(401).json({message: "Ingen tillgång till denna sida - token saknas"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) return res.status(403).json({message: "Ogiltig JWT"})

            req.username = user.username;
            next();
    });    
}

//Starta applikationen
app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
})