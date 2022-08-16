import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export const signUp = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => userCredential.user
  );
};
