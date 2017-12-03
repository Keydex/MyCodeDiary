// imports for firebase
import * as Firebase from "firebase";

var config = {
    apiKey: "AIzaSyCwiAEQIEcq_t3p6EGdvJ9IfxvB7wIkwGg",
    authDomain: "codediary-1cec6.firebaseapp.com",
    databaseURL: "https://codediary-1cec6.firebaseio.com",
    projectId: "codediary-1cec6",
    storageBucket: "codediary-1cec6.appspot.com",
    messagingSenderId: "973063483473"
};

// global variable so that it can be forwarded to other pages 
export const fireVar = Firebase.initializeApp(config);