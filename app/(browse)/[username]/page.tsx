import { notFound } from "next/navigation";
import { getUserByUsername } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

const UserPage = async ({ params }: PageProps) => {
  const { username } = await params; // await here for Promise

  const user = await getUserByUsername(username);
  if (!user || !user.stream) notFound();

  const isBlocked = await isBlockedByUser(user.id);
  if (isBlocked) notFound();

  const isFollowing = await isFollowingUser(user.id);

  return (
    <div className="h-full bg-white dark:bg-zinc-700">
      <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />
    </div>
  );
};

export default UserPage;
