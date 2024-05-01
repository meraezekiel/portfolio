import { getEnvVars } from "../services/Environment";

export const GetImage = async (image_id) => {
    const apiEndpoint = getEnvVars();
    // console.log("--------------", apiEndpoint);
    try{
        if(image_id){
            return `${apiEndpoint.apiUrl}/assets/${image_id}?fit=outside&width=450&height=450&quality=100`;
        }else{
            return null;
        }
    }catch(error){
        console.error("getImage [image]", error.message);
        throw error;
    }
    
   
}
