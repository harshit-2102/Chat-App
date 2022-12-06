import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDMhOAw1ENAkVWFg6jH9IbzgwW27ncJ41A",
  authDomain: "chat-app-28e60.firebaseapp.com",
  projectId: "chat-app-28e60",
  storageBucket: "chat-app-28e60.appspot.com",
  messagingSenderId: "119740610431",
  appId: "1:119740610431:web:0cad4ef6010d402e968c4a"
})

export const auth = app.auth();

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app