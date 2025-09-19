import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { hash } from "@node-rs/argon2";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // 1. Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // 2. Hash password
    const hashPassword = await hash(password);

    // 3. Create user (role always VIEWER at signup)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: "VIEWER"
      },
    });

    // 4. Remove password before sending response
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
