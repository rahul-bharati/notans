import { createUserWithEmailAndPassword, inMemoryPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";

export const signUp = async (email: string, password: string) => {
  return setPersistence(auth, inMemoryPersistence).then(() => createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => userCredential.user
  ))
};

export const signIn = async (email: string, password: string) => {
  return setPersistence(auth, inMemoryPersistence).then(() => signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => userCredential.user
  ))
};

export const checkIfUserExists = async (username:string) => {
  const q = query(collection(db, "users"), where("username", "==", username))
  const querySnapshot = await getDocs(collection(db, "users"))
  return querySnapshot.size > 0
}

export const checkIfUserIsRegistered = async (userid: string) => {
  const q = query(collection(db, "users"), where("userid", "==", userid))
  const querySnapshot = await getDocs(collection(db, "users"))
  return querySnapshot.size > 0
}

export const createRecord = async (userid: string, username: string, name: string) => {
  const userRef = collection(db, "users");
  await setDoc(doc(userRef, userid), {username, userid, name})
}
