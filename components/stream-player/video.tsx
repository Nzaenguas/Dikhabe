"use client";

import { ConnectionState, Track } from "livekit-client";
import { 
    useConnectionState,
    useRemoteParticipant,
    useTracks,
 } from "@livekit/components-react";
import { OfflineVideo } from "./offline-video";
import { LoadingVideo } from "./loading-video";
import { LiveVideo } from "./live-video";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoProps {
    hostName: string;
    hostIdentity: string;
};

export const Video = ({
    hostName,
    hostIdentity,
}: VideoProps) => {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone,
    ]).filter((track) => track.participant.identity === hostIdentity);

    let content;

    if (!participant && connectionState === ConnectionState.Connected) {
        content = <OfflineVideo username={hostName} />;
    } else if (!participant || tracks.length === 0) {
        content = <LoadingVideo label={connectionState} />
    } else {
        content = <LiveVideo participant={participant} />
    };

    return (
        <div className=" w-full h-full">
            {content}
        </div>
    );
};

export const VideoSkeleton = () => {
    return(
        <div className="w-full h-[400px] border- border-white/5 bg-background">
            <Skeleton className="h-full w-full rounded-none" />
        </div>
    )
}