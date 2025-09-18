import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma"; 
import { hash } from "@node-rs/argon2";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Hash password
    const hashPassword = await hash(password);

    // Save user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    // Remove password before sending response
    const { password: _password, ...safeUser } = user;

    return NextResponse.json({ user: safeUser }, { status: 201 });
  } catch (error) {
    console.error("POST /api/auth/signUp error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
