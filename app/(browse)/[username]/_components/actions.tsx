"use client";

import { toast } from 'sonner';
import { useTransition } from "react";
import { onFollow, onUnfollow } from "@/actions/follow";
import { onBlock, onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";

interface ActionsProps {
    isFollowing: boolean;
    isBlocked: boolean;
    userId: string;
}

export const Actions = ({
    isFollowing,
    isBlocked,
    userId,
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`Followed ${data.following.username}`))
                .catch(() => toast.error("Failed to follow"));
        });
    };

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`Unfollowed ${data.following.username}`))
                .catch(() => toast.error("Failed to unfollow"));
        });
    };

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => {
    if (data?.blocked?.username) {
        toast.success(`${data.blocked.username} has been blocked`);
    } else {
        toast.error("Unexpected response");
    }
})
                .catch(() => toast.error("Failed to block"));
        });
    };

    const handleUnblock = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((data) => toast.success(`${data.blocked.username} has been unblocked`))
                .catch(() => toast.error("Failed to unblock"));
        });
    };

    const onFollowClick = () => {
        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    };

    const onBlockClick = () => {
        if (isBlocked) {
            handleUnblock();
        } else {
            handleBlock();
        }
    };

    return (
        <>
            <Button 
                disabled={isPending} 
                onClick={onFollowClick} 
                variant="primary"
            >
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button 
                disabled={isPending} 
                onClick={onBlockClick} 
                className="bg-white text-black"
            >
                {isBlocked ? "Unblock" : "Block"}
            </Button>
        </>
    );
};
