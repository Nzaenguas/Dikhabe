import { notFound } from "next/navigation";
import { getStreamByStreamId } from "@/lib/stream-by-id";  // updated function name
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface WatchPageProps {
  params: Promise<{ streamId: string }>; // params is now a Promise
}

const WatchPage = async ({ params }: WatchPageProps) => {
  const { streamId } = await params;  // await params here
  const stream = await getStreamByStreamId(streamId);

  if (!stream || !stream.user) {
    console.log("Stream or user not found");
    notFound();
  }

  const isFollowing = await isFollowingUser(stream.user.id);
  const isBlocked = await isBlockedByUser(stream.user.id);

  if (isBlocked) {
    notFound();
  }

  return (
    <div className="h-full bg-white dark:bg-zinc-700">
      <StreamPlayer
        user={stream.user}
        stream={stream}
        isFollowing={isFollowing}
      />
    </div>
  );
};

export default WatchPage;
