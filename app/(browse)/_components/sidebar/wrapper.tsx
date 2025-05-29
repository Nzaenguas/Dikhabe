"use client";

import { useIsClient } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const isClient = useIsClient();
  const { collapsed } = useSidebar((state) => state);

  const baseClasses =
    "fixed left-0 flex flex-col h-full bg-black border-r z-50 overflow-visible";

  if (!isClient) {
    return (
      <aside
        className={cn(
          baseClasses,
          "border-[#2D2E35]",
          "w-[70px]"
        )}
      >
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        baseClasses,
        "border-zinc-300 dark:border-white/10",
        collapsed ? "w-[70px]" : "w-60"
      )}
    >
      {children}
    </aside>
  );
};
