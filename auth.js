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

// Init
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Button handler
document.getElementById("loginBtn").addEventListener("click", () => {
  auth.signInWithPopup(provider)
    .then((result) => {
      console.log("Signed in:", result.user.email);
      window.location.href = "game.html";  // Redirect after login
    })
    .catch((error) => {
      console.error("Login error:", error);
      alert("Login failed.");
    });
});
