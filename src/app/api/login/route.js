import { connectMongoose } from "../database/connectToDB";
import User from "../database/Models/usermodel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";

export const POST = async (req, res) => {
  connectMongoose();
  const { email, password } = await req.json();
  const user = await User.findOne({ email });
  if (!user)
    return NextResponse.json({ error: "user not found" }, { status: 400 });
  const validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword) {
    return NextResponse.json(
      { error: "Invlid email or password" },
      { status: 400 }
    );
  }
  const response = NextResponse.json(
    { success: true, message: "Login successful", user:user._id },
    { status: 201 }
  );

  cookies().set({
    name: "currentUser",
    value:user._id,
    httpOnly: true,
  });
  return response;
};


export const GET = async (req) => {
  const currentUser = cookies().get("currentUser");
  try {
    await connectMongoose();
    let user = await User.findById(currentUser.value);
    let value = {
      id:user._id,
      email: user.email,
    }
    if(user) return NextResponse.json(value, {status: 200})
    else return NextResponse.json({message:"something went wrong"})
    } catch (error) {
    console.log(error)
    return NextResponse.json({message:"No user found"}, {status:404})

  }
}
