import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommended = async () => {
  let userId: string | null = null;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          { NOT: { id: userId } },
          { NOT: { followedBy: { some: { followerId: userId } } } },
          { NOT: { blocking: { some: { blockedId: userId } } } },
        ],
      },
      select: {
        id: true,
        username: true,
        imageUrl: true,
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      select: {
        id: true,
        username: true,
        imageUrl: true,
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
