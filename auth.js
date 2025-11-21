import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Force Google to always ask for account selection
provider.setCustomParameters({ prompt: 'select_account' });

// Use session-only persistence
setPersistence(auth, browserSessionPersistence);

// Elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");

// Helper to show errors
function showError(msg) {
  if (errorMsg) errorMsg.textContent = msg;
}

// Redirect if logged in
onAuthStateChanged(auth, user => {
  if (user && !window.location.hash.includes("loggedOut")) {
    window.location.href = "game.html";
  }
});

// GOOGLE SIGN-IN
document.getElementById("googleBtn").addEventListener("click", async () => {
  showError("");
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    showError(err.message);
  }
});

// EMAIL LOGIN
document.getElementById("emailLoginBtn").addEventListener("click", async () => {
  showError("");
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if (!email || !password) return showError("Enter both email and password.");
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    showError(err.message);
  }
});

// EMAIL SIGNUP
document.getElementById("emailSignupBtn").addEventListener("click", async () => {
  showError("");
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if (!email || !password) return showError("Enter both email and password.");
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    showError(err.message);
  }
});
