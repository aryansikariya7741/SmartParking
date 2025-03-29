import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyByKebVYhAbqOcf9NoTGlacdfPW9fp8BQw",
    authDomain: "parking-app-a985e.firebaseapp.com",
    projectId: "parking-app-a985e",
    storageBucket: "parking-app-a985e.firebasestorage.app",
    messagingSenderId: "982119883827",
    appId: "1:982119883827:web:891362df8d1b62d5906f46",
    measurementId: "G-S7HWGR74MV"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, collection, getDocs, updateDoc, doc };
