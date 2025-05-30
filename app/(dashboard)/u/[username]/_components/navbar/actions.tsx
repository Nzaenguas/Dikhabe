import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { LogOut } from "lucide-react";

export const Actions = () => {
    return (
    <div className="flex items-center gap-x-4 ml-2 lg:ml-auto">
        <Button
        size="sm"
        className="text-white/50 hover:bg-white/10 bg-black"
        asChild>
            <Link href="/">
            <LogOut className="h-5 w-5 mr-2" />
                Exit
            </Link>
        </Button>
        <UserButton 
            afterSignOutUrl="/" />
    </div>
    );
};