import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    thumbnailUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    }
})
    .middleware(async () => {
      const self = await getSelf();
      
      return { user: self };
    })
.onUploadComplete(async ({ metadata, file }) => {
  try {
    console.log("Upload complete file object:", file);
    console.log("User external ID:", metadata.user.externalUserId);

    const user = await db.user.findUnique({
      where: { externalUserId: metadata.user.externalUserId },
    });

    if (!user) {
      throw new Error("User not found for externalUserId: " + metadata.user.externalUserId);
    }

    const existingStream = await db.stream.findUnique({
      where: { userId: user.id },
    });

    if (!existingStream) {
      console.warn("No stream found for user, creating new record", user.id);
      await db.stream.create({
        data: {
          userId: user.id,
          thumbnailUrl: file.ufsUrl,
          name: "default name",
        },
      });
    } else {
      await db.stream.update({
        where: { userId: user.id },
        data: { thumbnailUrl: file.ufsUrl },
      });
    }

    return { ufsUrl: file.ufsUrl };
  } catch (error) {
    console.error("Upload completion error:", error);
    throw error;
  }
})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
