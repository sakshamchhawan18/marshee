import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzxkfoiVNVhh93JmfCkdg1CTpYhCU0_ao",
  authDomain: "marshee-14c6f.firebaseapp.com",
  projectId: "marshee-14c6f",
  storageBucket: "marshee-14c6f.appspot.com", // ✅ FIXED the `.app` typo
  messagingSenderId: "305999568673",
  appId: "1:305999568673:web:7fc7ea9f8e7feb056f6860"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app); // ✅ export this
// Add after getAuth(app)
auth.settings.appVerificationDisabledForTesting = true;
