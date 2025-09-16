import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [isAuthenticated, setIsAuthenticated] = useState(!!token)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if(storedToken){
            setToken(storedToken)
            setIsAuthenticated(true)
        }
        setIsLoading(false)
    }, [])

    const loginWithToken = (newToken) => {
        localStorage.setItem('token', newToken)
        setToken(newToken)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setIsAuthenticated(false)
    }

    const contextValue = {
        token,
        isLoading,
        isAuthenticated,
        loginWithToken,
        logout,
    }

    return <AuthContext.Provider value={contextValue}> 
        {children}
    </AuthContext.Provider>

}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(context === undefined){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}