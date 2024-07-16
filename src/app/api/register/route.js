import { NextResponse } from "next/server"
import { connectMongoose } from "../database/connectToDB"
import User from "../database/Models/usermodel"
import bcyrptjs from "bcryptjs"

export const POST = async (req, res) => {
    const {email, password} = await req.json()
    try{
        await connectMongoose()

        const user = await User.findOne({email})

        if(user) return NextResponse.json({error:"User already exists"}, {status: 400})
        const salt = await bcyrptjs.genSalt()
        const rpass = await bcyrptjs.hash(password, salt)
        const newUser = new User({
            email, 
            password: rpass
        })
        await newUser.save()
        return  NextResponse.json(newUser, {status: 200})
    }catch(error){
        console.log(error)
    }
    
}