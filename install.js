require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

//Koppla till databas
const db = new sqlite3.Database(process.env.DATABASE);

//Skapa tabell för databas
db.serialize(() => {
   

    db.run(`CREATE TABLE users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL,
        account_created DATETIME DEFAULT CURRENT_TIMESTAMP)`);

        console.log("tabell skapad");
});