// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1W0rNXV78mQV4WX3JljmPewRP1-DtZiU",
  authDomain: "synapse-social-sai.firebaseapp.com",
  databaseURL: "https://synapse-social-sai-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "synapse-social-sai",
  storageBucket: "synapse-social-sai.firebasestorage.app",
  messagingSenderId: "269633434355",
  appId: "1:269633434355:web:4b8a8c50f1001aeaa3bd86",
  measurementId: "G-3BLHJ42D92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');
const gotoRegisterButton = document.querySelector('#goto-register');
const gotoLoginButton = document.querySelector('#goto-login');
const loginContainer = document.querySelector('#login-container');
const registerContainer = document.querySelector('#register-container');
const messageDiv = document.querySelector('#message');

function showMessage(text, type = 'error') {
    messageDiv.textContent = text;
    messageDiv.classList.remove('error', 'success');
    messageDiv.classList.add(type);
    messageDiv.style.display = 'block';

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000)
}


loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('Logged in', user)
            showMessage('Logged In successfully', 'success');
        })
        .catch((error) => {
          console.error("Error logging in:", error);
          showMessage(error.message, 'error');
        });
});

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('registered in', user)
            showMessage('Registered successfully', 'success');
        })
        .catch((error) => {
          console.error("Error registering:", error);
          showMessage(error.message, 'error');
        });
});

gotoRegisterButton.addEventListener('click', () => {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'flex';
});

gotoLoginButton.addEventListener('click', () => {
  loginContainer.style.display = 'flex';
  registerContainer.style.display = 'none';
});