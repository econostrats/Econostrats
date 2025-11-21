import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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

// --- GOOGLE LOGIN ---
document.getElementById("googleBtn").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(() => window.location.href = "game.html")
    .catch(err => alert(err.message));
});

// --- EMAIL LOGIN ---
document.getElementById("emailLoginBtn").addEventListener("click", () => {
  const email = email.value;
  const pass = password.value;

  signInWithEmailAndPassword(auth, email, pass)
    .then(() => window.location.href = "game.html")
    .catch(err => alert(err.message));
});

// --- EMAIL SIGNUP ---
document.getElementById("emailSignupBtn").addEventListener("click", () => {
  const email = email.value;
  const pass = password.value;

  createUserWithEmailAndPassword(auth, email, pass)
    .then(() => window.location.href = "game.html")
    .catch(err => alert(err.message));
});

// Redirect if already logged in
onAuthStateChanged(auth, (user) => {
  if (user) window.location.href = "game.html";
});
