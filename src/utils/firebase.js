import firebase from "firebase/app";
import {
  FIREBASE_APIKEY,
  FIREBASE_APPID,
  FIREBASE_AUTHDOMAIN,
  FIREBASE_MEASUREMENTID,
  FIREBASE_MESSAGINGSENDERID,
  FIREBASE_PROJECTID,
  FIREBASE_STORAGEBUCKET,
} from "../const";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGINGSENDERID,
  appId: FIREBASE_APPID,
  measurementId: FIREBASE_MEASUREMENTID,
});

export const auth = app.auth();
export const store = firebase.firestore();
export default app;
