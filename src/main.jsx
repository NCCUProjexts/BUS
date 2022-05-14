import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from "./store";
import App from './App'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZDDyoKsYP-cK2cMxkpXwNR02IJb0BSVQ",
  authDomain: "maker22bus.firebaseapp.com",
  projectId: "maker22bus",
  storageBucket: "maker22bus.appspot.com",
  messagingSenderId: "1012639743266",
  appId: "1:1012639743266:web:fd4bc5a8b53c064d9af97b",
  measurementId: "G-QNHB5H8KGB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
