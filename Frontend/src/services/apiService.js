import axios from 'axios'

export const createShortURl = async(longURL) => {
    try {
        const response = await axios.post("/api/urls/shortenURL", {longURL})
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


