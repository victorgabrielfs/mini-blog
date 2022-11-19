
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAHYRPrRZe4cGnKRQu1GLqptjAfmqtfSFE",
  authDomain: "miniblog-9fc2c.firebaseapp.com",
  projectId: "miniblog-9fc2c",
  storageBucket: "miniblog-9fc2c.appspot.com",
  messagingSenderId: "794589159080",
  appId: "1:794589159080:web:49368fec6726697f48ec9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, app }