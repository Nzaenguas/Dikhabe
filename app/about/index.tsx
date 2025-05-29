"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";
import { Info } from "lucide-react";

export const About = () => {
  const router = useRouter();
  const { collapsed } = useSidebar((state) => state);

  const handleClick = () => {
    router.push("/about");
  };

  return (
    <div className="w-full flex items-center justify-center p-2">
      {collapsed ? (
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={handleClick}
        >
          <Info className="w-5 h-5" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          className="w-full justify-center gap-2"
          onClick={handleClick}
        >
          <Info className="w-5 h-5" />
          About
        </Button>
      )}
    </div>
  );
};
