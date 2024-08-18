import { collection, getDocs, query, where, addDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { onAuthStateChanged, signOut, } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
    uploadBytes,
    getDownloadURL,
    ref,
    getStorage
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

import { auth, db } from "../config.js";

let storage = getStorage()

// use html element in javascript
let logoutBtn = document.querySelector('#logoutBtn')
let userIcon = document.querySelector('#userIcon')
let loginDiv = document.querySelector('#loginDiv')

let product_title = document.querySelector('#product_title')
let Product_Description = document.querySelector('#Product_Description')
let product_Price = document.querySelector('#product_Price')
let UserName = document.querySelector('#UserName')
let phone_number = document.querySelector('#phone_number')
let productImage = document.querySelector('#productImage')
let form = document.querySelector('#form')
let postNow_btn = document.querySelector('#postNow_btn')
let uid = null


// check user status user login or not
onAuthStateChanged(auth, async (user) => {
    if (user) {
        uid = user.uid;
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            userIcon.src = data.photoUrl
        });
    } else {
        console.log('user is not here');
        loginDiv.innerHTML = `<a href="./login.html"><button class="btn btn-dark">login</button></a>`
        !user ? window.location = './login.html' : console.log('user ha ');
    }
});

form.addEventListener('submit', async event => {
    event.preventDefault()
    postNow_btn.innerHTML = `<img class="loading" src="./Images/load-37_256.gif" alt="">`

    let file = productImage.files[0]
    let url = await uploadFile(file, `${uid} + ${Date.now()}`)

    try {
        const docRef = await addDoc(collection(db, "product_details"), {
            product_Price: product_Price.value,
            productImage: url,
            phone_number: phone_number.value,
            UserName: UserName.value,
            product_title: product_title.value,
            Product_Description: Product_Description.value,
        });
        Swal.fire({
            title: 'Ad  publish successfully',
            text: 'See Your Ad',
            icon: 'success',
            confirmButtonText: 'See ad'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location = './index.html'
                }
            });

        // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
})


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

// logout function
logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        Swal.fire({
            title: 'Success!',
            text: 'Log-out Successfully',
            icon: 'success',
            confirmButtonText: 'Login'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location = './login.html'
                }
            });
        // window.location = './login.html'
    }).catch((error) => {
        // An error happened.
    });
})