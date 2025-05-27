import { WifiOff } from "lucide-react";

interface OfflineVideoProps {
    username: string;
};

export const OfflineVideo = ({
    username,
}: OfflineVideoProps) => {
    return (
        <div className="h-full flex flex-col bg-black space-y-4 justify-center items-center">
            <WifiOff className="h-10 w-10 text-white/70" />
            <p className="text-white/50">
                {username} is offline
            </p>
        </div>
    );
};