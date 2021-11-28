import { auth } from "../config/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { error, success } from "./notifications";
import { store } from "react-notifications-component";

export async function signup(
  email,
  password,
  route: Function,
  setLoading: Function
) {
  setLoading(true);
  createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      store.addNotification(success("account created!"));
      route();
    })
    .catch((err) => {
      if (err.code.includes("auth/weak-password")) {
        store.addNotification(error("weak password..."));
      } else if (err.code.includes("auth/email-already-in-use")) {
        store.addNotification(error("email already in use..."));
      } else {
        store.addNotification(error("error signing up, please try again..."));
      }
      setLoading(false);
    });
}

export async function signin(
  email,
  password,
  route: Function,
  setLoading: Function
) {
  setLoading(true);
  signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      store.addNotification(success("signed in!"));
      route();
    })
    .catch((err) => {
      store.addNotification(error("error signing up, please try again..."));
      setLoading(false);
    });
}

export async function signout(setLoading, route) {
  setLoading(true);
  auth.signOut().then((res) => {
    route();
  });
}
