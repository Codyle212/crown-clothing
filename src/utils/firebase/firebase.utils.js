import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCCIqY6-gapf2-PGuFJ3JMdrz_-sNGyl-k',
    authDomain: 'crown-clothing-db-60aa7.firebaseapp.com',
    projectId: 'crown-clothing-db-60aa7',
    storageBucket: 'crown-clothing-db-60aa7.appspot.com',
    messagingSenderId: '781769728732',
    appId: '1:781769728732:web:25f637c995b7bdfd144a19',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt });
        } catch (error) {
            console.log('error creating user document,', error);
        }
    }
    return userDocRef;
};
