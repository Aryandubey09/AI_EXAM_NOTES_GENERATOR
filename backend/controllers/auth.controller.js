import UserModel from "../models/user.model.js"
import { getToken } from "../utils/token.js"

export const googleAuth= async(req,res)=>{

    try {
           const {name,email} =req.body
           console.log("Received:", name, email);
           
           let user = await UserModel.findOne({email})
           console.log("Found user:", user);

           if(!user){
            user = await UserModel.create({name,email})
            console.log("Created user:", user);
           }

           let token =await getToken(user._id)

           res.cookie("token", token ,{
             httpOnly:true,
             secure: true,
             sameSite: "none",
             path:"/",
                maxAge: 7*24*60*60*1000
            })

            return res.status(200).json(user)

    } catch (error) {
        console.error("Auth error:", error);
        return res.status(500).json({message:`Google signup error ${error}`})
    }
}


export const logOut =async(req,res) =>{
    try {
        await res.clearCookie("token")
        return res.status(200).json({message:"Logout successfully"})
    } catch (error) {
                return res.status(500).json({message:`Logout failed ${error}`})

    } 
}

