import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Only disable reCAPTCHA for test numbers in dev
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  // Wrap in try-catch in case `auth.settings` is undefined early
  try {
    auth.settings.appVerificationDisabledForTesting = true;
  } catch (err) {
    console.warn('⚠️ Could not disable reCAPTCHA in testing mode:', err);
  }
}

export { auth };
