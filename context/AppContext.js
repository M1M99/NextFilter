'use client'
import { createContext, useState } from "react"
const AppContext = createContext()

export function AppContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AppContext.Provider>
    )
}
export { AppContext }
