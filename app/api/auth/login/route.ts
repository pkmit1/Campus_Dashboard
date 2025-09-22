import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { verify } from "@node-rs/argon2";
import {generateToken} from "../../../../utils/jwt"

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Find user (fetching role too if needed)
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true, // ✅ include role
        password: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 2. Verify password
    const passwordValid = await verify(user.password, password);
    if (!passwordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // 3. Create JWT (with role)
    const token = await  generateToken({
      userId: user.id,
      email: user.email,
      role: user.role, // ✅ add role in token payload
    })
     

    // 4. Return response + cookie
    const { password: _password, ...safeUser } = user;

    const response = NextResponse.json(
      { message: "Login successful", user: safeUser },
      { status: 200 }
    );
  

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, 
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
