import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";

export const signUp = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => userCredential.user
  );
};

export const signIn = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => userCredential.user
  );
};

export const checkIfUserExists = async (userId:string) => {
  const dbRef = doc(db, "users", userId)
  const docSnap = await getDoc(dbRef);
  return docSnap.exists();
}

export const createRecord = async (userid: string, username: string) => {}
