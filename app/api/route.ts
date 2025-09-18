import { NextResponse } from "next/server";
import { prisma } from "../lib/prisma"; // make sure this path is correct

// GET /api/users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users });
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST /api/users
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const user = await prisma.user.create({
      data: {
        name: body.name || "Ashu", // fallback
        email: body.email || "bds.ashu+1@gmail.com",
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}



