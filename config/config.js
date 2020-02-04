import * as firebase from 'firebase';

// Initialize Firebase


firebase.initializeApp(firebaseConfig);

export const fireB = firebase
export const database = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();


