// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import $ from 'jquery';

// Your web app's Firebase configuration
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
const auth = getAuth(app);

const form = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const formTitle = document.getElementById('form-title');
const formHelperText = document.getElementById('form-helper-text');
const formToggle = document.getElementById('form-toggle');
const submitBtn = document.getElementById('submit-btn');
const errorMessage = document.getElementById('error-message');
const confirmPasswordGroup = document.getElementById('confirm-password-group');

let isSignUpMode = false;


function updateUI(user) {
    if (user) {
        // User is signed in.
        window.location.href = 'dashboard.html' // Redirect to dashboard
    } else {
        // No user is signed in.
      console.log('Not logged in')
    }
  }


  onAuthStateChanged(auth, (user) => {
    updateUI(user)
  });

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    errorMessage.textContent = ''; // Clear previous errors

    try {
        if (isSignUpMode) {
          if (password !== confirmPasswordInput.value) {
              errorMessage.textContent = 'Passwords do not match.';
              return;
          }
            // Sign up user
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User signed up!');
            
        } else {
            // Sign in user
            await signInWithEmailAndPassword(auth, email, password);
           console.log('User signed in!');
        }
          updateUI(auth.currentUser)
          
    } catch (error) {
        console.error('Firebase Error:', error);
       errorMessage.textContent = error.message;
    }
});


formToggle.addEventListener('click', (e) => {
    e.preventDefault();

    isSignUpMode = !isSignUpMode;
    
    if (isSignUpMode) {
        // Change UI to sign up mode
        formTitle.textContent = 'Create an Account';
        formHelperText.textContent = 'Enter your email and password to create your account.';
        submitBtn.value = 'Sign Up';
        formToggle.innerHTML = 'Already have an account? <a href="#" id="signin-link">SIGN IN</a>';
        confirmPasswordGroup.classList.remove('hidden');
    } else {
        // Change UI to sign in mode
         formTitle.textContent = 'Sign In to Colorlib';
         formHelperText.textContent = 'Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.';
        submitBtn.value = 'Log In';
        formToggle.innerHTML = 'Don\'t have an account? <a href="#" id="signup-link">SIGN UP</a>';
        confirmPasswordGroup.classList.add('hidden');
    }
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
