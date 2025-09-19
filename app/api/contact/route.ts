import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

// Create a message (POST)
export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newMessage = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// Fetch all messages (GET)
export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// Update conversation/status (PUT)
export async function PUT(req: Request) {
  try {
    const { id, conversation, status } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
    }

    const updatedData: any = {};
    if (conversation) updatedData.conversation = conversation;
    if (status) updatedData.status = status;

    const updatedMessage = await prisma.contactMessage.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    return NextResponse.json({ success: true, message: updatedMessage });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}
