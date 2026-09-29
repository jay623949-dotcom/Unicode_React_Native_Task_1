import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOekQeMGDR3QxJ_OC_BSNFQ196MJbfinQ",
  authDomain: "myapp2-8dcfa.firebaseapp.com",
  projectId: "myapp2-8dcfa",
  storageBucket: "myapp2-8dcfa.firebasestorage.app",
  messagingSenderId: "774303952099",
  appId: "1:774303952099:web:4c24052e464e57c605a9d6",
  measurementId: "G-WRCKRVKJ43"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);