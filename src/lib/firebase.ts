import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration for Darsanam Tickets Booking Online
const firebaseConfig = {
  apiKey: "AIzaSyC3TDY80_gHsw9OXBFpZ9Y9ZYKoMsc1VQ4",
  authDomain: "darsanam-tkts-booking-online.firebaseapp.com",
  projectId: "darsanam-tkts-booking-online",
  storageBucket: "darsanam-tkts-booking-online.firebasestorage.app",
  messagingSenderId: "223318562756",
  appId: "1:223318562756:web:270de8cac3870b5790f691",
  measurementId: "G-0SHP077QH1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Configure Google Provider to force account selection
googleProvider.setCustomParameters({
  prompt: 'select_account' // Forces account selection even if one account is available
});

export { analytics };
export default app;
