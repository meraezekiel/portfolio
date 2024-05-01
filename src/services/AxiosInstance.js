import axios from 'axios';
import { getEnvVars } from './Environment';
import EventEmitter from "reactjs-eventemitter";
import { useSelector } from "react-redux";
import { getAuthToken } from '../functionsHelper/authToken';
const { apiUrl,serviceAccountApi} = getEnvVars();

const axiosInstance = axios.create({
  baseURL:apiUrl
})

axiosInstance.interceptors.request.use(
  (config) => {   
    return config
  },
  (err) => Promise.reject(err)
)

axiosInstance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (err) => {
    if (err?.response?.status === 401) {
      EventEmitter.dispatch('api401', event => {})
    } else {
      return Promise.reject(err);
    }
  }
);
export default axiosInstance;

export const ApiMethod = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  SEARCH:'SEARCH',
  DELETE:'DELETE'
}

export function ApiCall({ customEndpoint=false,service=false,apiEndpoint, apiData = {}, method = ApiMethod.POST,apiContentType='application/json', timeout = 100000000, fields, filter, token, limit, offset, sort,page, groupBy }) {
  let API_URL = apiUrl + apiEndpoint;
  if(customEndpoint){
    API_URL = apiEndpoint
  }
  let params = {
    method: method,
    url:apiEndpoint,
    baseUrl: apiUrl,
    url: API_URL,
    timeout: timeout,
    params: {},
    headers:{
        'Content-Type': apiContentType
    }
  }

 
  if (token) {
    params.headers.Authorization = `Bearer ${token}`; // Use params.headers here
  }
  if(service){
    params.headers.Authorization = `Bearer ${serviceAccountApi}`; // Use params.headers here
  }

  if (method === ApiMethod.POST) {
    params.data = apiData
  }

  if (method === ApiMethod.PATCH) {
    params.data = apiData
  }

  if (fields) {
    params.params.fields = fields; // Include the fields parameter in the request
  }

  if (filter) {
    params.params.filter = filter; // Include the filter parameter in the request
  }

  if (groupBy != undefined) {
    params.params.groupBy = groupBy; // Include the groupBy parameter in the request
  }

  if (limit !== undefined) {
    params.params.limit = limit;
  }

  if (offset !== undefined) {
    params.params.offset = offset;
  }

  if (sort !== undefined) {
    params.params.sort = sort;
  }
  if (page !== undefined) {
    params.params.page = page;
  }

  return axiosInstance(params)
}
