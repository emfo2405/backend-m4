const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, password, email, account_created } = req.body;

        //Validera input
        if (!username || !password || !email) {
            return res.status(400).json({error: "Felaktig data, skicka användarnamn, lösenord och epost-adress"})
        } else {
            res.status(201).json({message: "Användare skapad"});
        }

        

    } catch {
        res.status(500).json({error: "Server error"});
    }
});

router.post("/login", async (req, res) => {
    console.log("inloggning påbörjad")
});

module.exports = router;