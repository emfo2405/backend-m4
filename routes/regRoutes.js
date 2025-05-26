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

        const checkUser = `SELECT * FROM users WHERE username=?, email=?`;
        db.get(checkUser, [username, email], async(row) => {
         if (row) {
                res.status(400).json({message: "Användarnamn eller e-post finns redan"})
            }
        })

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
        
        //Kolla om användaren finns i databasen
        const sql = `SELECT * FROM users WHERE username=?`;
        db.get(sql, [username], async (err, row) => {
            if(err) {
                res.status(400).json({message: "Autentiseringen gick fel"})
            } else if (!row) {
                res.status(400).json({message: "Lösenord eller användarnamn stämde inte"})
            } else {
                const passwordMatch = await bcrypt.compare(password, row.password);

                if(!passwordMatch) {
                    res.status(401).json({message: "Lösenordet eller användarnamn stämde inte"})
                } else {
                    res.status(200).json({message: "Inloggning lyckades"});
                }
            }
        })


    } catch {
        res.status(500).json({error: "Server error"});
    }
});

module.exports = router;