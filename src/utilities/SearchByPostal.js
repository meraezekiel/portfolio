import { ApiCall, ApiMethod } from "../services/AxiosInstance"

const findIndexByPostal=(array, postal)=>{
    for (let i = 0; i < array.length; i++) {
      if (array[i].POSTAL === postal) {
        return i; // Return the index if postal code matches
      }
    }
    return -1; // Return -1 if postal code is not found
  }
  const NullReturnPostal ={
        ADDRESS: "",
        BLK_NO: "",
        BUILDING: "",
        POSTAL: "",
        ROAD_NAME: "",
  }
const getDataFromPostal = async(postalcode)=>{
    if(postalcode){
        return await ApiCall({
            apiEndpoint:`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalcode}&returnGeom=N&getAddrDetails=Y`,
            customEndpoint:true,
            method:ApiMethod.GET
        }).then((res)=>{
            const index = findIndexByPostal(res.data.results, postalcode);
            if(index !== -1){
                return res.data.results[index]
            }
            return NullReturnPostal
        }).catch((err)=>{
            return NullReturnPostal
        })
    }else{
        return NullReturnPostal
    }
   
}
export {
    getDataFromPostal
}