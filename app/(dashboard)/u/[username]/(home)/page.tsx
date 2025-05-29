import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

interface CreatorPageProps {
  params: Promise<{
    username: string;
  }>;
}

const Creatorpage = async ({ params }: CreatorPageProps) => {
  const { username } = await params; 

  const externalUser = await currentUser();
  const user = await getUserByUsername(username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    notFound();
  }

  return (
    <div className="h-full w-full bg-white dark:bg-zinc-700">
      <StreamPlayer 
        user={user}
        stream={user.stream}
        isFollowing={true}
      />
    </div>
  );
};

export default Creatorpage;
