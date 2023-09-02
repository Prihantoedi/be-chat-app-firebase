import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./FirebaseConfig.js";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

// const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
// const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});


app.get("/status", (request, response) => {
    const status = {
        "Status" : "Running",
        "FirebaseConfig": firebaseConfig,
    };

    response.send(status);
});
