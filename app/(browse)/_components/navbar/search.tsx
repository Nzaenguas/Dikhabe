"use client";

import qs from "query-string";
import React, { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { clerkMiddleware } from '@clerk/nextjs/server';

export const Search = () => {
    const router = useRouter();
    const [value, setValue] = useState("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value) return;

        const url = qs.stringifyUrl({
            url: "/search",
            query: { term: value },
        }, { skipEmptyString: true });

        router.push(url);
    };
    const onClear = () => {
        setValue("");
    };


    return (
        <form
        onSubmit={onSubmit}
            className="relative lg:w-full flex items-center"
        >
            <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
            className="rounded-r-none focus-visible:ring-0
            focus-visible:transparent in-focus-visible:ring-offset-0"
            />
            {value && (
                <X 
                className="absolute top-2.5 right-14
                h-5 w-5 text-gray-400 cursor-pointer hover:opacity-75 transition"
                onClick={onClear}
                />
            )}
            <Button
            type="submit"
            size="sm"
            variant="secondary"
            className="rounded-l-none bg-blue-600"
            >
                <SearchIcon className="h-5 w-5 relative text-" />
            </Button>
        </form>
    );
};