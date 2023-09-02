import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./FirebaseConfig.js";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";

dotenv.config();


const app = express();

app.use(express.json());

let allowedOrigins = ["http://localhost"];
app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            let msg = "The CORS policy for this site does not allow access from the specified Origin. ";
            return callback(new Error(msg), false);
        }

        return callback(null, true);
    }
    // origin: "http://localhost:80"
}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});


app.get("/status", (request, response) => {
    const res = {
        "Status" : "Running",
        "FirebaseConfig": firebaseConfig,
    };

    response.status(200).send(res);
});

app.get("/api/chat-app-firebase/v1/signin", (request, response) => {
    console.log(request.body);
    response.status(200).send("It's work!");
});
