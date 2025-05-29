"use client";

import qs from "query-string";
import React, { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center lg:w-full">
      {/* Input with right-rounded-none */}
      <div className="relative flex-grow">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          className="rounded-r-none pr-10 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {/* Clear (X) button inside input on the right side */}
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-white"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search icon button */}
      <Button
        type="submit"
        size="sm"
        variant="secondary"
        className="rounded-l-none bg-blue-600"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground hover:text-white" />
      </Button>
    </form>
  );
};
