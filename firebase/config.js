// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzz_j7oc6626gvsU4fnh4MuMAP6HffRrs",
    authDomain: "mariana-vargas.firebaseapp.com",
    projectId: "mariana-vargas",
    storageBucket: "mariana-vargas.appspot.com",
    messagingSenderId: "122620243067",
    appId: "1:122620243067:web:4ae0185e0c071440fb06de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)