import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDfgiRa-J48wktEE6Tg4YrcqPTg-1ztTpk",
  authDomain: "econostrats-5a73a.firebaseapp.com",
  projectId: "econostrats-5a73a",
  storageBucket: "econostrats-5a73a.firebasestorage.app",
  messagingSenderId: "766599325060",
  appId: "1:766599325060:web:fe589fe5fc7c60c09229d1",
  measurementId: "G-0CLV0PR5V2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");

// Redirect if already signed in
onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = "game.html";
  }
});

// Google Sign-In
document.getElementById("googleBtn").addEventListener("click", async () => {
  errorMsg.textContent = "";
  try {
    await signInWithPopup(auth, provider);
    // onAuthStateChanged will handle redirect
  } catch (err) {
    errorMsg.textContent = err.message;
  }
});

// Email Login
document.getElementById("emailLoginBtn").addEventListener("click", async () => {
  errorMsg.textContent = "";
  const email = emailInput.value;
  const password = passwordInput.value;
  if (!email || !password) return errorMsg.textContent = "Enter email and password.";

  try {
    await signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged will handle redirect
  } catch (err) {
    errorMsg.textContent = err.message;
  }
});

// Email Signup
document.getElementById("emailSignupBtn").addEventListener("click", async () => {
  errorMsg.textContent = "";
  const email = emailInput.value;
  const password = passwordInput.value;
  if (!email || !password) return errorMsg.textContent = "Enter email and password.";

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged will handle redirect
  } catch (err) {
    errorMsg.textContent = err.message;
  }
});
