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
provider.setCustomParameters({ prompt: 'select_account' });

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

// Redirect if already logged in
onAuthStateChanged(auth, user => {
  if (user) window.location.href = "game.html";
});

// Google Sign-In (Redirect)
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
