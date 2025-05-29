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
        className="text-white/50 bg-black hover:bg-zinc-700"
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