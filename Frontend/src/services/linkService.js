import axios from 'axios'
export const getUsersLinks = async (token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get("/api/links/my-links", config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {      
      return error.response.data;
    } else {
      throw new Error("An unexpected error occurred while fetching links.");
    }
  }
};
