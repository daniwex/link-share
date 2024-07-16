import { NextResponse } from "next/server";
import { connectMongoose } from "../database/connectToDB";
import Userl from "../database/Models/usermmodel";
import { cookies } from "next/headers";
import User from "../database/Models/usermodel";


export const GET = async (request) => {
    const currentUser = cookies().get("currentUser");
    try {
      await connectMongoose();
      const user = await Userl.findOne({ user: currentUser.value});
      let actualUser = await User.findById(currentUser.value)
      let u = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: actualUser.email
      }
      if (!user) {
        return NextResponse.json({ error: "user not found" }, { status: 400 });
      }
      return NextResponse.json(u, { status: 200 });
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  };
  

export const POST = async (request) => {
  const { firstName, lastName } = await request.json();
  const currentUser = cookies().get("currentUser");
  let user;
  console.log(firstName, lastName);
  try {
    await connectMongoose();
    user = new Userl({ user: currentUser.value[0], firstName, lastName });
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 400 });
    }
    await user.save();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const PATCH = async (request) => {
  const { firstName, lastName } = await request.json();
  const currentUser = cookies().get("currentUser");
  const user = await Userl.findOne({ user: currentUser.value});

  console.log(firstName, lastName);
  try {
    await connectMongoose();
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 400 });
    }
    user.firstName = firstName
    user.lastName = lastName
    await user.save();
    return NextResponse.json({ message:"data updated",status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

