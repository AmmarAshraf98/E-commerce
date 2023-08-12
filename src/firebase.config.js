import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBnyF4tv7M_UjM3UuAF4GGXO5Zcq21kSag",
  authDomain: "brand-store-4e8ad.firebaseapp.com",
  projectId: "brand-store-4e8ad",
  storageBucket: "brand-store-4e8ad.appspot.com",
  messagingSenderId: "185083183137",
  appId: "1:185083183137:web:b9f4a4210a812733e6a360",
};


//app refrence for my website on firebase
const app = initializeApp(firebaseConfig);
//to take reference from the current user state
export const auth = getAuth(app);
//firestore table which carry user data (id, username, email,password)
export const db = getFirestore(app);
//store img
export const storage = getStorage(app);

export default app;
