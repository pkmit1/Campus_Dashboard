import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

// GET: Fetch all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// PUT: Edit user role
export async function PUT(request: Request) {
  try {
    const { id, role } = await request.json();
    if (!id || !role) return NextResponse.json({ error: "Missing id or role" }, { status: 400 });

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// DELETE: Delete user
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing user ID" }, { status: 400 });

    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
