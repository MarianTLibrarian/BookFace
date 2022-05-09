import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';

// import 'dotenv/config';

import firebaseConfig from './firebaseConfig';

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREABASE_AUTH_DOMAIN,
//   projectId: process.env.FIRBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREABASE_MSG_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MESSAGE_ID,
// };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  try {
    const result = await signInWithPopup(auth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    const { user } = result;

    // TODO: I'm not really sure what to do with these things yet.
    console.log(result);
  } catch (err) {
    const { code, message, email } = err;

    const credential = GoogleAuthProvider.credentialFromError(err);

    console.log({ code, message, email });
  }
};

export const userSignOut = () => signOut(auth);
