'use client'
import { useEffect, useState } from "react"

const useLocalStorage = () => {
    const [user, setUser] = useState<string | null>(null);
    const updateUser = (newUser: any) => {
        localStorage.setItem('user', JSON.stringify(newUser))
        setUser(newUser);
    }
    useEffect(() => {
        if (window) {
            const userData = window.localStorage.getItem('user') || null;
            setUser(userData);
        }
    }, [])

    return {
        user,
        updateUser
    }
}

export default useLocalStorage;