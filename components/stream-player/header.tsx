"use client";

import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { VerifiedMark } from "../verified-mark";
import { useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { UserIcon, Share2 } from "lucide-react";
import { Actions, ActionsSkeleton } from "./actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface HeaderProps {
  imageUrl: string;
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  isFollowing: boolean;
  name: string;
  streamId: string;
}

export const Header = ({
  imageUrl,
  hostName,
  hostIdentity,
  viewerIdentity,
  isFollowing,
  name,
  streamId,
}: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const participantCount = participants.length - 1;

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const handleShare = () => {
    const link = `${window.location.origin}/watch/${streamId}`;
    navigator.clipboard.writeText(link);
    toast.success("Video link copied to clipboard!");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          isLive={isLive}
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-serif">{hostName}</h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">{name}</p>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
              <UserIcon className="h-4 w-4" />
              <p>
                {participantCount} {participantCount === 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-xs text-muted-foreground">Offline</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-x-2">
        <Actions
          isFollowing={isFollowing}
          hostIdentity={hostIdentity}
          isHost={isHost}
        />
        <Button
          size="sm"
          variant="ghost"
          className="text-muted-foreground hover:text-primary"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
      </div>
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-2">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 bg-neutral-950" />
          <Skeleton className="h-4 w-24 bg-neutral-950" />
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  );
};
