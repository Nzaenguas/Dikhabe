import { Loader } from "lucide-react";

interface LoadingVideoProps {
    label: string;
};

export const LoadingVideo = ({
    label,
}: LoadingVideoProps) => {
    return (
        <div className="h-full flex flex-col space-y-4 justify-center items-center bg-black">
            <Loader className="h-10 w-10 text-black dark:text-white/70 animate-spin" />
            <p className="text-black dark:text-white/50 capitalize">
                {label}
            </p>
        </div>
    );
};