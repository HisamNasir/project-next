import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbhQhFNUBSccgcthZX8wUD0MNwzeKW02Y",

  authDomain: "revenue-fae76.firebaseapp.com",

  projectId: "revenue-fae76",

  storageBucket: "revenue-fae76.appspot.com",

  messagingSenderId: "381610979071",

  appId: "1:381610979071:web:6d4112e83ecd8d9e6e66ca",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
