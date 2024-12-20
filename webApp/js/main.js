// Import Firebase modules (make sure these are correctly imported as you need them)
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// Your Firebase configuration (make sure this is valid)
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

const auth = getAuth(app);

// Get HTML elements
const userEmailInput = document.getElementById('user-email');
const userPasswordInput = document.getElementById('user-password');
const loginButton = document.getElementById('login-button');
const signupButton = document.getElementById('signup-button');
const signoutButton = document.getElementById('signout-button');
const authStatusDiv = document.getElementById('auth-status');

// Authentication Functions (implement them as we discussed before)

async function signUp(email, password) {
   try {
       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
       const user = userCredential.user;
       console.log('User signed up:', user);
       authStatusDiv.textContent = "User signed up successfully";
       // You can redirect the user or do further actions on signup
   } catch (error) {
       console.error('Error signing up:', error);
       authStatusDiv.textContent = `Error signing up: ${error.message}`;
       // Handle the error (e.g., display a message to the user)
   }
}

async function signIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User signed in:', user);
        authStatusDiv.textContent = "User signed in successfully";
        // Redirect or do further actions on signin
    } catch (error) {
        console.error('Error signing in:', error);
        authStatusDiv.textContent = `Error signing in: ${error.message}`;
        // Handle the error
    }
}
async function signOutUser() {
   try {
      await signOut(auth);
      console.log("User signed out.");
       authStatusDiv.textContent = "User Signed out Successfully.";
   } catch (error) {
      console.error('Error signing out:', error);
       authStatusDiv.textContent = `Error signing out: ${error.message}`;
   }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
      // User is signed in
      console.log('User is logged in:', user);
      authStatusDiv.textContent = "User is logged in.";
      // Update the UI (e.g., show user profile, redirect to main page)
  } else {
      // User is signed out
      console.log('User is logged out.');
      authStatusDiv.textContent = "User is logged out";
      // Update the UI (e.g., show login form)
  }
});


// Event Listeners
loginButton.addEventListener('click', async () => {
    const userEmail = userEmailInput.value
    const userPassword = userPasswordInput.value;
    await signIn(userEmail, userPassword)
});

signupButton.addEventListener('click', async () => {
    const userEmail = userEmailInput.value
    const userPassword = userPasswordInput.value;
    await signUp(userEmail, userPassword);
});

signoutButton.addEventListener('click', async () => {
  await signOutUser();
});




$(function() {
	'use strict';

	
  $('.form-control').on('input', function() {
	  var $field = $(this).closest('.form-group');
	  if (this.value) {
	    $field.addClass('field--not-empty');
	  } else {
	    $field.removeClass('field--not-empty');
	  }
	});

});