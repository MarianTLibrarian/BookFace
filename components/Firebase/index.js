import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';

import firebaseConfig from './firebaseConfig.js';

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  try {
    const result = await signInWithPopup(auth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    const { user } = result;

    return { user, token };
  } catch (err) {
    const { message } = err;

    // const credential = GoogleAuthProvider.credentialFromError(err);

    // console.error({ code, message, email, credential });

    return { user: null, token: null, message };
  }
};

export const userSignOut = () => signOut(auth);
