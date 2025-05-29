"use client"

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";


interface ContainerProps {
    children: React.ReactNode;
};

export const Container = ({
    children,
}: ContainerProps) => {
    const matches = useMediaQuery("(min-width: 1024px)");
    const{
        collapsed,
        onCollapse,
        onExpand,
    } = useSidebar((state) => state);

    useEffect(() => {
        if (matches) {
            onExpand();
        } else {
            onCollapse();
        }
    }, [matches, onCollapse, onExpand]);


    return (
        <div className={cn(
            "w-full px-4 transition-all",
            collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
        )}>
            {children}
        </div>
    )
}