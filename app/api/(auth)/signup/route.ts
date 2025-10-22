import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/lib/models/User";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, password } = body;

    const registeredUser = await User.findOne({ email: email });
    if (registeredUser) {
      return NextResponse.json(
        { error: "That email address is already in use" },
        { status: 409 }
      );
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      email: email,
      password: hashPassword,
      role: "USER",
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully!",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error, "error");
    return NextResponse.json(
      {
        success: false,
        message: "Signup request failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
