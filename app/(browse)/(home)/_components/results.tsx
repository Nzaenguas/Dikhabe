import { getStreams } from "@/lib/feed-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";

export const Results = async () => {
    const data = await getStreams();

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">
                Streams for you
            </h2>
            {data.length === 0 && (
                <div className="text-muted-foreground text-sm">
                    No streams found.
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {data.map((result) => (
                    <ResultCard 
                        key={result.id}
                        data={result}
                    />
                ))}
            </div>
        </div>
    )
}

export const ResultsSkeleton = () => {
    return (
        <div>
            <Skeleton className="h-8 w-[290px] mb-4 bg-neutral-950"/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                {[...Array(4)].map((_, i) => (
                    <ResultCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}