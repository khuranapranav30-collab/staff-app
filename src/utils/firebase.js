
import { initializeApp } from "firebase/app";

import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    getDocs,
    query
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBEJB4D2bwWGEapNpc6IwS2-52oJhPgtJY",
    authDomain: "pranav-database.firebaseapp.com",
    databaseURL: "https://pranav-database-default-rtdb.firebaseio.com",
    projectId: "pranav-database",
    storageBucket: "pranav-database.firebasestorage.app",
    messagingSenderId: "259892820912",
    appId: "1:259892820912:web:12c4409fcef3978ff1f475",
    measurementId: "G-N8NCQ46WLN"
};

const firebaseapp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseapp);
export const db = getFirestore(firebaseapp);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export async function signinWithgoogle() {
    return await signInWithPopup(auth, provider);
}

export async function creatinguserwithsignup(email, password) {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    return await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
}

export async function signinuser(email, password) {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    return await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
}

export async function creataUserdocfromauth(
    userAuth,
    additionalInfo = {}
) {
    if (!userAuth) {
        throw new Error("User is not authenticated");
    }

    const userDocRef = doc(db, "AI-X1", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        await setDoc(userDocRef, {
            displayName:
                additionalInfo.displayName ||
                userAuth.displayName ||
                "",
            email: userAuth.email || "",
            createdAt: new Date(),
            ...additionalInfo
        });
    }
}

export async function addcollectionanddocuments(
    collectionkey,
    objectstoadd
) {
    const collectionRef = collection(db, collectionkey);
    const batch = writeBatch(db);

    objectstoadd.forEach((object) => {
        const docRef = doc(
            collectionRef,
            object.name.toLowerCase()
        );

        batch.set(docRef, object);
    });

    await batch.commit();

    console.log("Staff data uploaded successfully");
}

export async function fetchstaffdata() {
    const collectionRef = collection(db, "staff");
    const q = query(collectionRef);
    const querysnapshot = await getDocs(q);

    return querysnapshot.docs.map((docsnapshot) => ({
        id: docsnapshot.id,
        ...docsnapshot.data()
    }));
}
