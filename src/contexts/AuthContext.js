import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase';

export const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loginuser, setLoginUser] = useState(true);

    // useEffect(() => {
    //     if (currentUser) {
    //         setLogin(true);
    //     } else {
    //         setLogin(false)
    //     }
    // }, [currentUser])

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function reset(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            // console.log(user);
            setCurrentUser(user);
        })

        return unsubscribe
    }, [loginuser])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        reset,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}