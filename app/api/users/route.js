import { NextResponse } from "next/server";
import dbConnect from "../../../src/lib/db";
import UserModel from "../../../src/models/User";
// mongodb+srv://NimraNaveed:nimra321@cluster0.mdnsguv.mongodb.net/

// GET /api/users - Fetch all users
export async function GET() {
  try {
    await dbConnect();
    const users = await UserModel.find({});
    console.log("users===", users)
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, email, age } = body;

    if (!name || !email || !age) {
      return NextResponse.json(
        { error: "Name, email, and age are required" },
        { status: 400 }
      );
    }

    const newUser = new UserModel({
      name,
      email,
      age: parseInt(age),
    });

    const savedUser = await newUser.save();
    return NextResponse.json(savedUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
