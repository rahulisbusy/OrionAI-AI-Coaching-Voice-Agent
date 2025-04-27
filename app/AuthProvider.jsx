"use client"
import { useUser } from '@stackframe/stack'
import { UserContext } from './_context/UserContext'
import { useMutation } from 'convex/react'
import React, { use, useEffect,useState } from 'react'
import { api } from '@/convex/_generated/api';

export const AuthProvider = ({ children }) => {
    const user = useUser();
    const CreateUser = useMutation(api.users.CreateUser);
    const [userData, setuserData] = useState();
    useEffect(() => {
        user && CreateNewUser();
       
       
    }, [user])
    const CreateNewUser = async () => {
        const result = await CreateUser({ name: user?.displayName, email: user?.primaryEmail });
        setuserData(result);
        console.log("Homepage ",result);
    }
    return (
        <div>
            <UserContext.Provider value={{userData,setuserData}}>
                {children}
            </UserContext.Provider>
        </div>
    )
}

export default AuthProvider;