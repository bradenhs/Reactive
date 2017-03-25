<script src='https://www.gstatic.com/firebasejs/3.7.3/firebase.js'></script>

const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyDNK2lQke-U05v9u_RN5DyPNeHkhBEE-sY',
    authDomain: 'reactive-476b0.firebaseapp.com',
    databaseURL: 'https://reactive-476b0.firebaseio.com',
    storageBucket: 'reactive-476b0.appspot.com',
    messagingSenderId: '51775670930'
}

firebase.initializeApp(config)

let db = firebase.database()
let reactiveRef = db.ref('reactive')