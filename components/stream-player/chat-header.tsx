"use clients";

import { Skeleton } from "@/components/ui/skeleton";

import { VariantToggle } from "./Variant-toggle";

export const ChatHeader = () => {
    return (
        <div className="relative p-3 border-b-white/5">
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
            <Skeleton className="w-28 h-6 mx-auto bg-white dark:bg-zinc-700" />
        </div>
    );
};