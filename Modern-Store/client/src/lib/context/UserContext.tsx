import { createContext, useEffect, useState } from "react";
import type { UserContextType, UserType } from "../../../types";


export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = useState<UserType | null>(null)


    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if(storedUser){
            setUser(JSON.parse(storedUser))
        }
    },[])

    return <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
}