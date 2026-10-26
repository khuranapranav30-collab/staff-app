import { createContext, useEffect, useState } from "react";
import stafflist from "../stafflist";
import {
    addcollectionanddocuments,
    fetchstaffdata
} from "../utils/firebase";

export const StaffContext = createContext({
    staff: []
});

export function StaffProvider({ children }) {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        async function loadStaff() {
            try {
                await addcollectionanddocuments("staff", stafflist);

                const data = await fetchstaffdata();
                setStaff(data);
            } catch (error) {
                console.error("Staff loading error:", error);
            }
        }

        loadStaff();
    }, []);

    return (
        <StaffContext.Provider value={{ staff }}>
            {children}
        </StaffContext.Provider>
    );
}
