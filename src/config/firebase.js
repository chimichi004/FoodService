import firebase from 'firebase/compat'

firebase.initializeApp({
    apiKey: "AIzaSyD9713ZtPuGVIQBXraEdHlsGimG7m1X8fk",
    authDomain: "react-crud-84c2f.firebaseapp.com",
    databaseURL: "https://react-crud-84c2f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-crud-84c2f",
    storageBucket: "react-crud-84c2f.appspot.com",
    messagingSenderId: "1004389609324",
    appId: "1:1004389609324:web:cb14a06fb3e11e4f1acd49"
})

export default firebase.firestore();