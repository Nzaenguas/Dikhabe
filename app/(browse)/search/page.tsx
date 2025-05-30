import { redirect } from "next/navigation";
import { Results, ResultsSkeleton } from "./_components/results";
import { Suspense } from "react";

interface SearchProps {
  searchParams: Promise<{
    term?: string;
  }>;
}

const SearchPage = async ({ searchParams }: SearchProps) => {
  const { term } = await searchParams;

  if (!term) {
    redirect("/");
  }

  return (
    <div className="h-full p-8 w-full mx-auto bg-white dark:bg-zinc-700">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={term} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
