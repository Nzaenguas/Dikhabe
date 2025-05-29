"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { NavItemSkeleton } from "./nav-item";
import { useIsClient } from "usehooks-ts";

interface WrapperProps {
    children: React.ReactNode;
}


export const Wrapper = ({ children }: WrapperProps) => {
  const isClient = useIsClient();
  const { collapsed } = useCreatorSidebar((state) => state);

    if (!isClient) {
        return (
            <aside
                className="fixed left-0 flex flex-col w-[70px] h-full bg-neutral-500 dark:bg-black border-r border-[#2D2E35] z-50"
            >
                <NavItemSkeleton />
            </aside>
        );
    }

    return (
        <aside
            className={cn(
                "fixed left-0 flex flex-col h-full bg-neutral-500 dark:bg-black border-r border-[#2D2E35] z-50",
                collapsed ? "w-[70px]" : "w-60"
            )}
        >
            {children}
        </aside>
    );
};
