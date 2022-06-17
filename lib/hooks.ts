import { doc, DocumentData, DocumentReference, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe;

        if (user) {
            const docRef: DocumentReference<DocumentData> = doc(getFirestore(), 'users', user.uid);
            unsubscribe = onSnapshot(docRef, (docSnapshot) => {
                setUsername(docSnapshot.data()?.username);
            });
        } else {
            setUsername(null);
        }

        return unsubscribe;
    }, [user]);
    return { user, username };
}