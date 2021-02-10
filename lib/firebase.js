import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBfPgpcIeORDHPQb_Q0em43W-LQ36ZwUlk",
    authDomain: "nextfire-app-a938f.firebaseapp.com",
    projectId: "nextfire-app-a938f",
    storageBucket: "nextfire-app-a938f.appspot.com",
    messagingSenderId: "613301293065",
    appId: "1:613301293065:web:5066d60a7862e6802fe8d8"
  };

  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const storage = firebase.storage();
  export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;



  /**
   * Gets a user/{uid} document with username
   * @param {string} username
   */
  export async function getUserWithUsername(username) {
      const usersRef = firestore.collection('users');
      const query = usersRef.where('username', '==', username).limit(1);

      const userDoc = (await query.get()).docs[0];
      return userDoc;
  }

  /**
   * Converts a firestore document to JSON
   * @param {DocumentSnapshot} doc
   */
  export function postToJSON(doc) {
      const data = doc.data();
      return {
          ...data,
          createdAt: data.createdAt.toMillis(),
          updatedAt: data.updatedAt.toMillis(),
          
      }
  }