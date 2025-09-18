// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { verify } from "@node-rs/argon2";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 2. Verify password
    const passwordValid = await verify(user.password, password);
    if (!passwordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // 3. Create JWT
    const token = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);

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
      maxAge: 60 * 60, // 1 hour
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
