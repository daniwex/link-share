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
        console.log(error)
    }
}

export const POST = async (req, res) => {
    const currentUser = cookies().get("currentUser");
    const Links = await req.json()
    console.log(Links)
    try {
        await connectMongoose()
        const user = await Userl.findOne({ user: currentUser.value });
        user.links.push(...Links)
        user.save()
        return NextResponse.json({message:"saved"},{status:200})
    } catch (error) {
        console.log(error)
    }

}



