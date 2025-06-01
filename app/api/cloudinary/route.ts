import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;
    

    if (!file || !file.type.startsWith("video/")) {
      return NextResponse.json({ error: "Invalid file" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "streamx/videos",
        },
        (error, result) => {
          if (error || !result?.secure_url || !result.public_id) {
            console.error("Cloudinary upload failed:", error);
            reject("Cloudinary upload failed");
            return;
          }
          resolve(result);
        }
      );

      Readable.from(buffer).pipe(uploadStream);
    });

    const result = uploadResult as UploadApiResponse;

    const user = await db.user.findUnique({
      where: { externalUserId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const video = await db.video.create({
      data: {
        url: result.secure_url,
        name,
        userId: user.id,
      },
    });

    return NextResponse.json({
      id: video.id,
      url: video.url,
      name: video.name,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
