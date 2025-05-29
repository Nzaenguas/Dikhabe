"use clients";

import { Skeleton } from "@/components/ui/skeleton";

import { ChatToggle } from "./chat-toggle";
import { VariantToggle } from "./Variant-toggle";

export const ChatHeader = () => {
    return (
        <div className="relative p-3 border-b-white/5">
            <div className="absolute left-2 top-2 hidden lg:block">
                <ChatToggle />
            </div>
            <p className="font-semibold text-primary text-center">
                Stream Chat
            </p>
            <div className="absolute right-1 top-2">
                <VariantToggle />
            </div>
        </div>
    );
};

export const ChatHeaderSkeleton = () => {
    return (
        <div className="relative p-3 border-b-accent-foreground mb:block">
            <Skeleton className="absolute h-6 w-6 left-3 top-3 bg-white dark:bg-zinc-700" />
            <Skeleton className="w-28 h-6 mx-auto bg-white dark:bg-zinc-700" />
        </div>
    );
};