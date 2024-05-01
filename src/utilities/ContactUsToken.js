import { ApiCall, ApiMethod } from "../services/AxiosInstance";

export default async  function  ContactUsToken (data){
  
    const code = data[0]?.meta?.code;
    let innerEncodedString = code;
    
    for (let currentIndex = 1; currentIndex > 0; currentIndex++) {
      const decode = atob(innerEncodedString);
      innerEncodedString = decode;
    
      if (innerEncodedString.includes('email')) {
        try {
          const cres = JSON.parse(innerEncodedString);
          const res = await ApiCall({
            apiEndpoint: '/auth/login',
            method: ApiMethod.POST,
            apiData: {
              email: cres.email,
              password: cres.password
            }
          });
          
          const data = res.data.data;
          return data.access_token;
        } catch (err) {
          console.log("Error:", err);
          return "";
        }
      }
    }

}