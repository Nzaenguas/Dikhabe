"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface ActionsProps {
    hostIdentity: string;
    isFollowing: boolean;
    isHost: boolean;
}

export const Actions = ({
    hostIdentity,
    isFollowing,
    isHost,
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { userId } = useAuth();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"));
        });
    };

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
                .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"));
        });
    };

    const toggleFollow = () => {
        if (!userId) {
            return router.push("/sign-in");
        }

        if (isHost) return;

        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    };

    return (
        <Button
            disabled={isPending || isHost}
            onClick={toggleFollow}
            size="sm"
            className={cn("w-full lg:w-auto text-muted-foreground",
                isFollowing ? "bg-red-700 hover:bg-red-900" : "bg-green-700 hover:bg-green-700"
            )}
        >
            <Heart
                className={cn(
                    "h-4 w-4 mr-2 text-muted-foreground"
                )}
            />
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    );
};

export const ActionsSkeleton = () => {
    return <Skeleton className="h-10 w-full lg:w-24 bg-neutral-950" />;
};
