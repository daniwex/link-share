import { NextResponse } from "next/server";
import { connectMongoose } from "../database/connectToDB";
import Userl from "../database/Models/usermmodel";
import { cookies } from "next/headers";


export const GET = async (request) => {
    const currentUser = cookies().get("currentUser");
    try{
        await connectMongoose()
        const user = await Userl.findOne({ user: currentUser.value });
        return NextResponse.json(user.links, {status: 200})
    }catch (error) {
        return NextResponse.json({message:"no items found"})
    }
}

export const POST = async (req, res) => {
    const currentUser = cookies().get("currentUser");
    const Links = await req.json()
    try {
        await connectMongoose()
        let user = await Userl.findOne({ user: currentUser.value });
        if(!user){
            user = new Userl({ user: currentUser.value,links:[] });
        }
        user.links.push(Links)
        user.save()
        return NextResponse.json({message:"Your changes have been successfully saved"},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"no items found"})
    }

}


export const DELETE = async (req,res) => {
    const currentUser = cookies().get("currentUser");
    const id = await req.json()
    console.log(id)
    try {
        await connectMongoose()
        let user = await Userl.findOne({ user: currentUser.value });
        user.links = user.links.filter(el => !Object.keys(el).includes(id))
        user.save()
        return NextResponse.json({message:"Your changes have been successfully saved"},{status:200})

    }catch(error){
        console.log(error)
    }
}