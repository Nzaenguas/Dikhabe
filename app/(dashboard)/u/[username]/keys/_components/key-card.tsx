"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CopyButton } from "./copy-button";

interface KeyCardProps {
    value: string | null;
};

export const KeyCard = ({
    value,
}: KeyCardProps) => {
    const [show, setShow] = useState(false);
    return (
        <div className="rounded-xl bg-neutral-500 dark:bg-black p-6">
            <div className="flex items-start gap-x-10">
                <p className="font-semibold shrink-0">
                Stream Key
                </p>
                <div className="space-y-2 w-full">
                    <div className="w-full flex items-center gap-x-2">
                        <input
                        value={value || ""}
                        type={show ? "text" : "password"}
                        disabled
                        placeholder="Stream key"
                        />
                        <CopyButton value={value || ""} />
                    </div>
                    <Button
                    onClick={() => setShow(!show)}
                    size="sm"
                    variant="link">
                        {show? "Hide" : "Show"}
                    </Button>
                </div>
            </div>
        </div>
    );
};