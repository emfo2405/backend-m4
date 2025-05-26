require("dotenv").config();
const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const db = new sqlite3.Database(process.env.DATABASE);

router.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;

        //Validera input
        if (!username || !password || !email) {
            return res.status(400).json({error: "Felaktig data, skicka användarnamn, lösenord och epost-adress"})
        } 

        //Kryptera lösenord
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
            
        
        const sql = `INSERT INTO users (username, password, email) VALUES(?,?,?)`;
        db.run(sql, [username, hashedPassword, email], (err) => {

        if(err) {
            res.status(400).json({message: "Det gick inte att skapa användaren..."});
        } else {
            res.status(201).json({message: "Användare skapad"});
        }

        }); 

        
        

        

    } catch {
        res.status(500).json({error: "Server error"});
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

            if (!username || !password ) {
            return res.status(400).json({error: "Felaktig data, skicka användarnamn och lösenord"});
        } 
        
         else if (username === "emfo"  && password === "hejsan") {
            res.status(200).json({message: "Inloggning lyckades"})
        } else {
            res.status(401).json({error: "Ogiltigt användarnamn eller lösenord"});
        }


    } catch {
        res.status(500).json({error: "Server error"});
    }
});

module.exports = router;