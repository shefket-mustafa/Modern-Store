import {  createContext, useEffect, useState } from "react";
import type {  UserContextType, UserType } from "../../../types";

export const UserContext = createContext<UserContextType | undefined>(undefined);



export const UserProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = useState<UserType | null>(null)


    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                // corrupted or invalid JSON in localStorage — clearing it and keep user as null
                console.warn('UserProvider: failed to parse stored user, clearing localStorage.user', err);
                localStorage.removeItem('user');
                setUser(null);
            }
        } else {
            // ensure we don't keep invalid literal strings
            if (storedUser === 'undefined' || storedUser === 'null') localStorage.removeItem('user');
        }
    },[])

    return <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
}

