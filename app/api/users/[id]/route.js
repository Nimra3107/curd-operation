import { NextResponse } from "next/server";
import dbConnect from "../../../../src/lib/db";
import UserModel from "../../../../src/models/User";

// GET /api/users/[id] - Fetch a single user by ID
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const user = await UserModel.findById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] - Update a user by ID
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await request.json();
    const { name, email, age } = body;

    if (!name || !email || !age) {
      return NextResponse.json(
        { error: "Name, email, and age are required" },
        { status: 400 }
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, email, age: parseInt(age) },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete a user by ID
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
