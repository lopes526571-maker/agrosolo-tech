import { initializeApp } from "firebase/app";

import {
  getAuth
} from "firebase/auth";

const firebaseConfig = {
  apiKey:
    "AIzaSyATOCYmHhQr7zX9XzUKXqAFc6vXE8h5wko",

  authDomain:
    "agrosolo-tech.firebaseapp.com",

  projectId:
    "agrosolo-tech",

  storageBucket:
    "agrosolo-tech.firebasestorage.app",

  messagingSenderId:
    "530242759025",

  appId:
    "1:530242759025:web:941b6d5bb742bdaead2ed0",
};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);