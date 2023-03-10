import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore';

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () =>
//     signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd,
    field
) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        const documentRef = doc(collectionRef, object[field].toLowerCase());
        batch.set(documentRef, object);
    });

    await batch.commit();
    console.log('done uploading to objects to firebase');
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'catagories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
};

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating user document,', error);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
    return await signOut(auth);
};

export const onAuthStateChangeListener = (callback) =>
    onAuthStateChanged(auth, callback);
