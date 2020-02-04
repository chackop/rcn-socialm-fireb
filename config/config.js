import * as firebase from 'firebase';

// Initialize Firebase

const firebaseConfig = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    appId: "appId",
    measurementId: "measurementId"
};
export const FBappID = 'appID'

firebase.initializeApp(firebaseConfig);

export const fireB = firebase
export const database = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();


