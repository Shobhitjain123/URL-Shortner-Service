import {axiosInstance} from '../utils/axiosInstance'

export const createShortURl = async(longURL, token) => { 
    const config = {
        headers: {
            'Authorization': 'Bearer '
        }
    }
    
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`
    }
    
    try {
        const response = await axiosInstance.post("/api/urls/shortenURL", {longURL}, config)
        return response.data
    } catch (error) {        
        if(error.response && error.response.data){      
            return error.response.data
        }else{
            throw new Error("An unexpected error occurred. Please try again.")
        }
    }
}

export const registerUser = async(userData) => {
    try {
        const response = await axiosInstance.post("/api/auth/register", userData)
        return response.data
    } catch (error) {        
        if(error.response && error.response.data){      
            return error.response.data
        }else{
            throw new Error("An unexpected error occurred. Please try again.")
        }
    }
}

export const login = async(credentials) => {
    try {
        const response = await axiosInstance.post("/api/auth/login", credentials)        
        return response.data
    } catch (error) {        
        if(error.response && error.response.data){      
            return error.response.data
        }else{
            throw new Error("An unexpected error occurred. Please try again.")
        }
    }
}


