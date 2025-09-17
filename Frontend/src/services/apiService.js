import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx';

export const createShortURl = async(longURL, token) => { 
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        
        const response = await axios.post("/api/urls/shortenURL", {longURL}, config)
        console.log(response);
        
        return response.data
    } catch (error) {        
        if(error.response && error.response.data){      
            console.log(error.response.data);
                  
            return error.response.data
        }else{
            throw new Error("An unexpected error occurred. Please try again.")
        }
    }
}

export const registerUser = async(userData) => {
    try {
        const response = await axios.post("/api/auth/register", userData)
        console.log(response);
        
        return response.data
    } catch (error) {        
        if(error.response && error.response.data){      
            console.log(error.response.data);
                  
            return error.response.data
        }else{
            throw new Error("An unexpected error occurred. Please try again.")
        }
    }
}

export const login = async(credentials) => {
    try {
        const response = await axios.post("/api/auth/login", credentials)        
        return response.data
    } catch (error) {        
        if(error.response && error.response.data){      
            console.log(error.response.data);
                  
            return error.response.data
        }else{
            throw new Error("An unexpected error occurred. Please try again.")
        }
    }
}


