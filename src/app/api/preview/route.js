import { connectMongoose } from "../database/connectToDB";
import User from "../database/Models/usermodel";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Userl from "../database/Models/usermmodel";

export const POST = async (req) => {
    const currentUser = cookies().get('currentUser')
    const id = await req.json()
    try {
        await connectMongoose()
        const loginDetails = await User.findById(id[0])
        const userDetails = await Userl.findOne({user:id[0]})
        const response = {
            email: loginDetails.email,
            full_name: userDetails.firstName + ' ' + userDetails.lastName,
            links: userDetails.links,
            loggedIn: currentUser != null
        }
        return NextResponse.json(response, {status:200})
    } catch (error) {
        console.log(error)
    }
}