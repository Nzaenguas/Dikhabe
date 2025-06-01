import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET(
  req: Request,
  { params }: { params: { videoId: string } }
) {
  const { videoId } = params;

  try {
    const video = await db.video.findUnique({
      where: { id: videoId },
      include: {
        user: {
          include: {
            _count: { select: { followedBy: true } },
          },
        },
      },
    });

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const followerCount = video.user?._count.followedBy ?? 0;

    const user = video.user
      ? {
          id: video.user.id,
          externalUserId: video.user.externalUserId,
          username: video.user.username,
          bio: video.user.bio,
          imageUrl: video.user.imageUrl,
          _count: {
            followedBy: followerCount,
          },
        }
      : null;

    const videoData = {
      id: video.id,
      url: video.url,
      name: video.name ?? null,
    };

    return NextResponse.json({ user, video: videoData });
  } catch (error) {
    console.error("Fetch video error:", error);
    return NextResponse.json({ error: "Failed to fetch video data" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: { videoId: string } }
) {
  const params = await context.params; 
  console.log("DELETE called with videoId:", params.videoId);

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const video = await db.video.findUnique({
    where: { id: params.videoId },
    include: { user: true },
  });

  if (!video || video.user?.externalUserId !== userId) {
    return NextResponse.json({ error: "Not found or not authorized" }, { status: 404 });
  }

  await db.video.delete({
    where: { id: params.videoId },
  });

  return NextResponse.json({ success: true });
}