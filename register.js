import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
    uploadBytes,
    getDownloadURL,
    ref,
    getStorage
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

// import from config.js
import { auth } from "../config.js";
import { db } from "../config.js";

let storage = getStorage()

// html element use in javascript!
let form = document.querySelector("#form")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let firet_name = document.querySelector("#first_name")
let last_name = document.querySelector("#last_name")
let myfile = document.querySelector("#myfile")
let registorBtn = document.querySelector("#registorBtn")

// registor user and save data into firestore
form.addEventListener('submit', event => {
    event.preventDefault()
    
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        registorBtn.innerHTML = `<img class="loading" src="./Assets/Images/load-37_256.gif" alt="">`

            let file = myfile.files[0]
            let url = null
            if (file) {
                url = await uploadFile(file, email.value)
                console.log(url);
            }

            Swal.fire({
                title: 'Success!',
                text: 'Your account registered successfully!',
                icon: 'success',
                confirmButtonText: 'Login'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location = "./login.html";
                    }
                });

            // add data into firestore database
            try {
                const docRef = await addDoc(collection(db, "users"), {
                    firet_name: firet_name.value,
                    last_name: last_name.value,
                    email: email.value,
                    uid: user.uid,
                    photoUrl: url
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
})

// img to url convert function
async function uploadFile(file, userEmail) {
    const storageRef = ref(storage, userEmail);
    try {
        const uploadImg = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(uploadImg.ref);
        return url;
    } catch (error) {
        console.error(error);
        throw error;
    }
}