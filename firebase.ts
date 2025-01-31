import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLAWQpHGiZlbxlFk22HjQRxVsCfsTuPbc",
  authDomain: "expyr-ai.firebaseapp.com",
  projectId: "expyr-ai",
  storageBucket: "expyr-ai.appspot.com",
  messagingSenderId: "164281328122",
  appId: "1:164281328122:android:b677058f3fc82b3a430443"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with explicit type
export const db: Firestore = getFirestore(app);