import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const username = url.searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  const videos = await db.video.findMany({
    where: {
      user: { username },
    },
    select: {
      id: true,
      url: true,
      name: true,
    },
  });

  return NextResponse.json(videos);
}
