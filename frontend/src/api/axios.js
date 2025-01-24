import axios from "axios";


// console.log(import.meta.env.REACT_APP_API_URL)
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // baseURL: 'http://localhost:8080/api',
    withCredentials: true, 
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        
    }, 
    
})


apiClient.interceptors.response.use((config)=>{

    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
},(error)=>{
    console.log(error.message)
    return Promise.reject(error);
})



export default apiClient