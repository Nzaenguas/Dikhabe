import { db } from "@/lib/db";

export const getStreamByStreamId = async (streamId: string) => {
  return await db.stream.findUnique({
    where: { id: streamId },
    include: {
      user: {
        include: {
          stream: true,
          _count: true,  // includes all counts by default
        },
      },
    },
  });
};
