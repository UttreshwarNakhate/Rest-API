import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBGh4c5ptzt860o2gU_ztxEb-olm2Vi0lU",
  authDomain: "pwa-app-a9332.firebaseapp.com",
  projectId: "pwa-app-a9332",
  storageBucket: "pwa-app-a9332.appspot.com",
  messagingSenderId: "1071048714329",
  appId: "1:1071048714329:web:9feb711ba8b2f6489a6948",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { app, messaging, getToken, onMessage };
