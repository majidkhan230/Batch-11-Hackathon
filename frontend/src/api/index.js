import { showToast } from "@/helpers/showToast.js"
import apiClient from "./axios.js"


export const getReq = async(url) =>{
    try {
        const req = await apiClient.get(url)
        return req
    } catch (error) {
        console.log(error.message)
        showToast('error', error.message)

    }
}
export const postReq =async (url,data,options={}) =>{
    try {
        const req = await apiClient.post(url,data, options)
        showToast("sucess",req.data.message)
        return req
    } catch (error) {
        console.log(error.response?.data?.message)
        showToast('error', error?.response?.data.message ||error.message)

    }
}
export const updReq = async(url,data,options={}) =>{
    try {
        const req = await apiClient.put(url,data,options)
        showToast("sucess",req?.data?.message)
        return req
    } catch (error) {
        console.log(error.message)
        showToast('error', error.message)
    }
}
export const delReq = async(url) =>{
    try {
        const req = await apiClient.delete(url)
        return req
    } catch (error) {
        console.log(error.message)
        showToast('error', error.message)

    }
}