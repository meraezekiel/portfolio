
const setAuthToken = (data)=>{
    localStorage.setItem("auth", data);
}
const getAuthToken = ()=>{
   return localStorage.getItem("auth");
}

export {
    setAuthToken,
    getAuthToken
}