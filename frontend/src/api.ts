import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchData = async () => {
    try{
      const response = await axios.get(`${API_URL}/api/posts`);
      const data = await response.data;
      console.log("Fronend Data: ",data);
      return data;
    }
    catch(err){
        console.error("Error fetching data", err);
        return [];
    } 
};
