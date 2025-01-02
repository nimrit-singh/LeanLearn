// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import for Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB1QARVmCny747hsaqNcCtbJa6QFjgiWY",
  authDomain: "leanlearn-7a568.firebaseapp.com",
  projectId: "leanlearn-7a568",
  storageBucket: "leanlearn-7a568.appspot.com", // Corrected the storage bucket URL
  messagingSenderId: "775970441403",
  appId: "1:775970441403:web:df5dd344f5e87dde3c019e",
  measurementId: "G-Z2BPGYD92P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app); // Export the auth instance for use in your app

// export default app;

if (process.env.NODE_ENV === "development") {
  auth.settings.appVerificationDisabledForTesting = true;
}