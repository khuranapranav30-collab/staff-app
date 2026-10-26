import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

export const UserContext = createContext({
    currentuser: null,
    setcurrentuser: () => null
});

export function UserProvider({ children }) {
    const [currentuser, setcurrentuser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setcurrentuser(user);
        });

        return unsubscribe;
    }, []);

    const value = { currentuser, setcurrentuser };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}