import axios from "axios"
import { serverUrl } from "../App"
import { setUserData } from "../redux/userSlice";




export const getCurrentUser = async (dispatch) =>{
    try {
        const result =await axios.get(serverUrl + "/api/user/currentuser",{withCredentials:true})
       
        dispatch(setUserData(result.data))
        
    } catch (error) {
        console.log(error);
        
    }
}

export const generateNotes =async (payload)=>{
    try {
    
         const result =await axios.post(serverUrl + "/api/notes/generate-notes", payload ,{withCredentials:true})
         console.log(result.data);
         return result.data
     
    } catch (error) {
        console.log(error);
        
    }
}

export const downloadPdf = async (result) => {
    try {
        const response = await axios.post(serverUrl + "/api/pdf/generate-pdf", {result}, {
            withCredentials: true,
            responseType: 'blob'
        });
        const blob =new Blob([response.data],{
            type:"application/pdf"
        })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = "notes.pdf"
        link.click()
        window.URL.revokeObjectURL(url)
        
    } catch (error) {
        console.log("PDF Download error:", error);
        throw error;
    }       
}