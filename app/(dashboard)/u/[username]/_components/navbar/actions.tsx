import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Clapperboard, LogOut } from "lucide-react";

export const Actions = () => {
    return (
    <div className="flex items-center gap-x-4 ml-2 lg:ml-auto">
        <Button
        size="sm"
        className="text-black dark:text-white/50 bg-neutral-500 hover:bg-white dark:bg-black"
        asChild>
            <Link href="/">
            <LogOut className="h-5 w-5 mr-2" />
                Exit
            </Link>
        </Button>
        <UserButton {...({
            signOutRedirectUrl:"/"} as any)}/>
    </div>
    );
};