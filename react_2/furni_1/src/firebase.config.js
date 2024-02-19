import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB7I7CTeDAogUM2PscaqhJWSimQwNyx50c",
  authDomain: "furni-shop-aa316.firebaseapp.com",
  projectId: "furni-shop-aa316",
  storageBucket: "furni-shop-aa316.appspot.com",
  messagingSenderId: "321687955030",
  appId: "1:321687955030:web:bb8cae07e5beada3a6fdf7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;