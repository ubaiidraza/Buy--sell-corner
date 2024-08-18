import { onAuthStateChanged, signOut, } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db } from "../config.js";

// use html element in javascript
const logoutBtn = document.querySelector('#logoutBtn')
const userIcon = document.querySelector('#userIcon')
const product_title = document.querySelector('#product_title')
const user_image = document.querySelector('#user_image')
const phone_number = document.querySelector('#phone_number')
const userName = document.querySelector('#userName')
const main_product_head = document.querySelector('#main_product_head')
const product_image = document.querySelector('#product_image')
const product_price = document.querySelector('#product_price')
const product_description = document.querySelector('#product_description')



let getData = JSON.parse(localStorage.getItem('sendlocal'))
console.log(getData);

function renderScreen(){
    product_image.src = getData.productImage
    product_title.innerHTML = getData.product_title
    phone_number.innerHTML = getData.phone_number
    userName.innerHTML = getData.UserName
    main_product_head.innerHTML = getData.product_title
    product_price.innerHTML = getData.product_Price
    product_description.innerHTML = getData.Product_Description
}
renderScreen()


// check user status user login or not
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            userIcon.src = data.photoUrl
            // user_image.src = data.photoUrl
        });

    } else {
        Swal.fire({
            title: 'Setting!',
            text: 'Please Login First',
            confirmButtonText: 'Login',
            icon: 'error',
        })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location = '../index.html'
                }
            });
        
        // loginDiv.innerHTML = `<a href="./login.html"><button class="btn btn-dark">login</button></a>`
    }
});

userIcon.addEventListener('click', () => {
    Swal.fire({
        title: 'Setting!',
        text: 'Do you want to Ad post',
        confirmButtonText: 'Ad Post'
    })
        .then((result) => {
            if (result.isConfirmed) {
                window.location = './postad.html'
            }
        });
})

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
    }).catch((error) => {
        // An error happened.
    });
})


