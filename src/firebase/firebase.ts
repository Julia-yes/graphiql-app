import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification,
} from 'firebase/auth';
import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore';

import { getFirebaseConfig } from './firebase';

const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

const registerWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      authProvider: 'local',
      email,
    });
    sendEmailVerification(user);
  } catch (err) {
    console.error(err);
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
