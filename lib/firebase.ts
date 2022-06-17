import firebase, { getApp } from 'firebase/app'
import {Auth, getAuth, GoogleAuthProvider} from 'firebase/auth'
import {Firestore, getFirestore, limit, query, where, collection, getDocs} from 'firebase/firestore'
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAQ2jvW_GMZWPM0EtADG_4rBVAVR8J4ZrU",
    authDomain: "fireship-6f51b.firebaseapp.com",
    projectId: "fireship-6f51b",
    storageBucket: "fireship-6f51b.appspot.com",
    messagingSenderId: "588767141986",
    appId: "1:588767141986:web:73e6b7bc3605624e67313b",
    measurementId: "G-X9T4KKD4RX"
  };
  
  function createFirebaseApp(config) {
    try {
      return getApp();
    } catch {
      return initializeApp(config);
    }
  }
  
  // const firebaseApp = initializeApp(firebaseConfig);
  const firebaseApp = createFirebaseApp(firebaseConfig);
  
  
  
  // Auth exports
  // export const auth = firebase.auth();
  export const auth = getAuth(firebaseApp);
  export const googleAuthProvider = new GoogleAuthProvider();
  
  // Firestore exports
  export const firestore = getFirestore(firebaseApp);
  // export const firestore = firebase.firestore();
  // export { firestore };
  // export const serverTimestamp = serverTimestamp;
  // export const fromMillis = fromMillis;
  // export const increment = increment;
  
  // Storage exports
  export const storage = getStorage(firebaseApp);
  export const STATE_CHANGED = 'state_changed';
  
  /// Helper functions
  
  
  /**`
   * Gets a users/{uid} document with username
   * @param  {string} username
   */
  export async function getUserWithUsername(username) {
    // const usersRef = collection(firestore, 'users');
    // const query = usersRef.where('username', '==', username).limit(1);
  
    const q = query(
      collection(firestore, 'users'), 
      where('username', '==', username),
      limit(1)
    )
    const userDoc = ( await getDocs(q) ).docs[0];
    return userDoc;
  }
  
  /**`
   * Converts a firestore document to JSON
   * @param  {DocumentSnapshot} doc
   */
  export function postToJSON(doc) {
    const data = doc.data();
    return {
      ...data,
      // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
      createdAt: data?.createdAt.toMillis() || 0,
      updatedAt: data?.updatedAt.toMillis() || 0,
    };
  }
  