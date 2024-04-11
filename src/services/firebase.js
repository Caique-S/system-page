import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB6zI07WGTLFPH0lsmvxA4C--GsTLImby4",
  authDomain: "app-mobile-24713.firebaseapp.com",
  projectId: "app-mobile-24713",
  storageBucket: "app-mobile-24713.appspot.com",
  messagingSenderId: "831119318957",
  appId: "1:831119318957:web:d049679d37c91c6b294b24",
  measurementId: "G-ZBLR7RLH59"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)