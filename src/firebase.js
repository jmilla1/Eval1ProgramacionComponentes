import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/functions';


const firebaseConfig = {
  apiKey: "AIzaSyDxfVIv_RnKbatgNwz9Ls7HqZC-_6AZTTY",
  authDomain: "evaluacion1-9a1ac.firebaseapp.com",
  projectId: "evaluacion1-9a1ac",
  storageBucket: "evaluacion1-9a1ac.firebasestorage.app",
  messagingSenderId: "669826458148",
  appId: "1:669826458148:web:d190c154ca5b6ef295eeb1"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();

export { db, auth, functions };
export default firebase;