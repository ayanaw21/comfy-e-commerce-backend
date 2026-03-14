import User from "../models/user.model.ts";

export const getCurrentUser = async(userId:string)=>{
    const user = await User.findById(userId).select("-password")
    if(!user) throw new Error("user not found")
    return user;
}
