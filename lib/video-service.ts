// lib/video-service.ts
import { db } from "@/lib/db";

export function getVideoById(videoId: string) {
  return db.video.findUnique({
    where: { id: videoId },
    include: { user: true },
  });
}
