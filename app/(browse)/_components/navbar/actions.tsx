'use client';

import { Button } from "@/components/ui/button";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Clapperboard, LogIn } from "lucide-react";

export const Actions = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-x-2 ml-2 lg:ml-auto">
      {!user && (
        <SignInButton>
          <Button size="sm" variant="primary">
            <LogIn className="w-4 h-4" />
              <span>Login</span>
          </Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton />
        </div>
      )}
    </div>
  );
};
