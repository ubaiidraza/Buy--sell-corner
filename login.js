import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth } from "../config.js";

// html element use in javascript!
let form = document.querySelector("#form")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let loginBtn = document.querySelector("#loginBtn")

// get input value and check user login
form.addEventListener('submit', event => {
    event.preventDefault()

    // sign in function 
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        loginBtn.innerHTML = `<img class="loading" src="./Images/load-37_256.gif" alt="">`
        const user = userCredential.user;
        console.log(user);
        Swal.fire({
            title: 'Success!',
            text: 'Your are Login Successfully',
            icon: 'success',
            confirmButtonText: 'Login'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location = './index.html'
                }
            });
        })
        .catch((error) => {
            const errorMessage = error.message;
            Swal.fire({
                title: 'Success!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'try again'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        // window.location = './index.html'
                    }
                });
        });
})