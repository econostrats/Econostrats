import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "...",
  authDomain: "econostrats-5a73a.firebaseapp.com",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Force account selection
provider.setCustomParameters({ prompt: 'select_account' });

// Elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");

function showError(msg) {
  if (errorMsg) errorMsg.textContent = msg;
}

// Handle redirect result
getRedirectResult(auth)
  .then(result => {
    if (result?.user) {
      window.location.href = "game.html";
    }
  })
  .catch(err => showError(err.message));

// Redirect if already signed in (normal)
onAuthStateChanged(auth, user => {
  if (user) window.location.href = "game.html";
});

// Google Sign-In using redirect
document.getElementById("googleBtn").addEventListener("click", () => {
  showError("");
  signInWithRedirect(auth, provider);
});

// Email login
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

// Email signup
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
