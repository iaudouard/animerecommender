import firebase, { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { config } from "../constants/firebase.constants";
const firebaseConfig = config;

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
