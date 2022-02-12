
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import 'firebase/compat/storage';
import "firebase/storage";

import "firebase/compat/database"
const firebaseConfig = {
    apiKey: "AIzaSyDvrS6qGl4mEQwRD_SFTsdodDe65xaPVDc",
    authDomain: "chatapp-49d28.firebaseapp.com",
    projectId: "chatapp-49d28",
    storageBucket: "chatapp-49d28.appspot.com",
    messagingSenderId: "833028691715",
    appId: "1:833028691715:web:76fa1f7d8403d0fbf7bb36"
  };

  let app;
  if(firebase.apps.length === 0)
  {
    app = firebase.initializeApp(firebaseConfig);
  }
  else {
      app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export  { db, auth, provider, storage, firebase as default };