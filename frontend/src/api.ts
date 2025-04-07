import axios from "axios";

const API_URL = "https://full-stack-blog-api.vercel.app";

export const fetchData = async () => {
    try{
      const response = await axios.get(`${API_URL}/api/posts`);
      const data = await response.data;
      console.log("Frontend Data: ",data);
      return data;
    }
    catch(err){
        console.error("Error fetching data", err);
        return [];
    } 
};
