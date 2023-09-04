import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseConfig } from "./FirebaseConfig.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";

dotenv.config();


const app = express();

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
// app.use(express.json());

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
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


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

app.post("/api/chat-app-firebase/v1/signin", (request, response) => {
    const data = request.body;
    const email = data.email;
    const password = data.password;

    let authResponseList = new Map([
        ["Firebase: Error (auth/wrong-password).", "Invalid Password"],
        ["Firebase: Error (auth/user-not-found).", "Email not registered"]
    ]);

    signInWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const accessToken = user.accessToken;
        const res = {
            "Status" : "Accepted",
            "AccessToken" : accessToken
        };
        response.status(200).send(res);
    }).
    catch((error) => {
        const res = {
            "Status" : "Rejected",
            "Message" : authResponseList.get(error.message)
        };

        response.status(400).send(res);
    });

});

app.post("/api/chat-app-firebase/v1/authorization/checker", (request, response) => {
    const data = request.body;
    const token = data.accessToken;

    onAuthStateChanged(firebaseAuth, (user) => {
        if(user){
            if(user.accessToken == token){
                const res = {
                    "Status" : "Accepted"
                };

                return response.status(200).send(res);
                
            } else{
                const res = {
                    "Status" : "Rejected",
                    "Message" : "Invalid Token Access!"
                };
                return response.status(400).send(res);
            }
        } else{
            const res = {
                "Status" : "Rejected",
                "Message" : "Illegal Attempt!"
            };

            return response.status(400).send(res);
        }
    });

});

app.post("/api/chat-app-firebase/v1/destroy", (request, response) => {
    // const data = request.body;
    // const token = data.accessToken;

    // response.status(200).send({"Status" : "Okay"});
    let res = {"Status": "Accepted", "Message" : "Sign Out Successfully"};
    signOut(firebaseAuth).then(() => {
       return response.status(200).send(res); 
    }).catch((error) => {
        res = {
            "Status" : "Rejected",
            "Message" : error
        };
        return response.status(400).send(res);
    });
    // response.status(200).send(res);
    // console.log(res.Status);

    // if(res.Status === "Accepted"){
    //     response.status(200).send(res);
    // } else{
    //     response.status(400).send(res);
    // }
    

    
   
});
