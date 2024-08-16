
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBx97x-JufARMMPekWkRGT_6Flfid2DDR8",
    authDomain: "vydamore-ea949.firebaseapp.com",
    projectId: "vydamore-ea949",
    storageBucket: "vydamore-ea949.appspot.com",
    messagingSenderId: "363045889390",
    appId: "1:363045889390:web:ade4517744f380e40f8d7f",
    measurementId: "G-0H8E7EQZ9M"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
