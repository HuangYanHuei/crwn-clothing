import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAsIfPr7rSTmX2zIfxkr-xbH7cVeb7rxtM",
  authDomain: "crwn-clothing-db-6d1b7.firebaseapp.com",
  projectId: "crwn-clothing-db-6d1b7",
  storageBucket: "crwn-clothing-db-6d1b7.appspot.com",
  messagingSenderId: "580216977556",
  appId: "1:580216977556:web:1ada31d78bdbc40ae89c81"
};

//Firestore 初始化
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.getCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPasswor = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}