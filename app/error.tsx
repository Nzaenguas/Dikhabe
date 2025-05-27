"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = () => {
    return (
        <div className="h-full flex flex-col space-y-4 items-center bg-indigo-950 justify-center text-muted-foreground">
            <p>
                Something went wrong
            </p>
            <Button
                variant="secondary"
                asChild
            >
                <Link href="/">
                    Go back home
                </Link>
            </Button>
        </div>
    );
};

export default ErrorPage;