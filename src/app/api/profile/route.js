import { NextResponse } from "next/server";
import { connectMongoose } from "../database/connectToDB";
import Userl from "../database/Models/usermmodel";
import { cookies } from "next/headers";
import User from "../database/Models/usermodel";

export const GET = async (request) => {
  const currentUser = cookies().get("currentUser");
  try {
    await connectMongoose();
    const user = await Userl?.find({ user: currentUser.value });
    let actualUser = await User.findById(currentUser.value);
    if (user) {
      let u = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: actualUser.email,
      };
      return NextResponse.json(u, { status: 200 });
    }
    return NextResponse.json(actualUser.email);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const POST = async (request) => {
  const { firstName, lastName } = await request.json();
  const currentUser = cookies().get("currentUser");
  console.log(currentUser.value);
  try {
    await connectMongoose();
    let user = new Userl({ user: currentUser.value, firstName, lastName });
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
  const user = await Userl.findOne({ user: currentUser.value });
  if (user.firstName == firstName && user.lastName == lastName)
    return NextResponse.json({ message: "Data is not modified", status: 200 });

  try {
    await connectMongoose();
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 400 });
    }
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
    return NextResponse.json({ message: "data updated", status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
