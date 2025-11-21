// Your Firebase config
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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

document.getElementById("googleBtn").addEventListener("click", () => {
  auth.signInWithPopup(provider)
    .then(result => {
      console.log("Google sign-in success:", result.user.email);
      window.location.href = "game.html";
    })
    .catch(error => {
      console.error("Google login error:", error);
      alert("Google login failed: " + error.message);
    });
});

document.getElementById("emailLoginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, pass)
    .then(user => {
      console.log("Email login success:", user.user.email);
      window.location.href = "game.html";
    })
    .catch(error => {
      console.error("Email login error:", error);
      alert("Login failed: " + error.message);
    });
});

document.getElementById("emailSignupBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, pass)
    .then(user => {
      console.log("Signup success:", user.user.email);
      window.location.href = "game.html";
    })
    .catch(error => {
      console.error("Signup error:", error);
      alert("Signup failed: " + error.message);
    });
});

// Redirect if already signed in
auth.onAuthStateChanged(user => {
  if (user) {
    window.location.href = "game.html";
  }
});
