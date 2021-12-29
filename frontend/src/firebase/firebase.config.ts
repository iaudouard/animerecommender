import firebase, { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { config } from "../constants/firebase.constants";
const firebaseConfig = config;

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const githubProvider = new GithubAuthProvider();
export const googleProvider = new GoogleAuthProvider();
