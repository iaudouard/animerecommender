import { error, success } from "../utils/notifications";
import { store } from "react-notifications-component";
import { db } from "./firebase.config";
import { collection, getDoc, setDoc, doc } from "firebase/firestore";

export const colRef = collection(db, "users");

export function readData(uid: string) {
  const userRef = doc(db, "users", uid);
  return getDoc(userRef)
    .then((res) => {
      return res.data();
    })
    .catch((err) => {
      return store.addNotification(error(err.message));
    });
}

export function addLikedAnime(uid: string, animeTitle: string) {
  const userRef = doc(db, "users", uid);
}
export function changeUserTheme(uid: string, newTheme: string) {
  const userRef = doc(db, "users", uid);
  return setDoc(userRef, { theme: newTheme }, { merge: true });
}

export function createNewUserDoc(
  uid: string,
  email: string,
  username: string,
  theme: string | null
) {
  const userRef = doc(db, "users", uid);
  return setDoc(userRef, { email: email, username: username, theme: theme });
}

export function getUsername(uid: string) {
  const userRef = doc(db, "users", uid);
  return getDoc(userRef)
    .then((res) => {
      const data = res.data();
      if (data) {
        return data["username"];
      }
    })
    .catch((err) => {
      return store.addNotification(error(err.message));
    });
}
