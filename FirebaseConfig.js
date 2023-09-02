import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY, 
    authDomain: process.env.FIREBASE_AUTH_KEY, 
    projectId: process.env.FIREBASE_PROJECT_ID, 
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET, 
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID, 
    appId: process.env.FIREBASE_APP_ID
};


export {firebaseConfig};