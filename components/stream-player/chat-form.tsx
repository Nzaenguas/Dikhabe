"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatInfo } from "./chat-info";

interface ChatFormProps {
    onSubmit: () => void;
    value: string;
    onChange: (value: string) => void;
    isHidden: boolean;
    isFollowersOnly: boolean;
    isFollowing: boolean;
    isDelayed: boolean;
};

export const ChatForm =({
    onSubmit,
    value,
    onChange,
    isHidden,
    isFollowersOnly,
    isFollowing,
    isDelayed,
}: ChatFormProps) => {
    const [isDelayedBlocked, setIsDelayedBlocked] = useState(false)

    const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
    const isDisabled = isHidden || isDelayedBlocked || isFollowersOnlyAndNotFollowing;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if(!value || isDisabled) return;

        if (isDelayed && !isDelayedBlocked) {
            setIsDelayedBlocked(true);
            setTimeout(() => {
                setIsDelayedBlocked(false)
                onSubmit();
            }, 3000);
        } else {
            onSubmit();
        }
    }

    if (isHidden) {
        return null;
    }

    return (
        <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-y-4 p-3"
        ><div className="bottom-0 w-full">
            <ChatInfo 
                isDelayed={isDelayed}
                isFollowersOnly={isFollowersOnly}
            />
            <Input 
                onChange={(e) => onChange(e.target.value)}
                value={value}
                disabled={isDisabled}
                placeholder="send a message"
                className={cn(
                    "border-zinc-300 dark:border-white/10",
                    (isFollowersOnly || isDelayed) && "rounded-t-none borber-t-0"
                )}
            />
        </div>
        <div className="ml-auto">
            <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={isDisabled}
                >
                    Chat
            </Button>
        </div>
        </form>
    );
};

export const ChatFormSkeleton = () => {
    return (
        <div className="flex flex-col item-center gap-y-4 p-3">
            <Skeleton className="w-auto h-10 bg-white dark:bg-zinc-700" />
            <div className="flex items-center gap-x-2 ml-auto">
                <Skeleton className="h-7 w-7 bg-white dark:bg-zinc-700" />
                <Skeleton className="h-7 w-7 bg-white dark:bg-zinc-700" />
            </div>
        </div>
    );
};