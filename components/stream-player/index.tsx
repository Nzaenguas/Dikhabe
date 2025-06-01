"use client";
import { LiveKitRoom } from "@livekit/components-react";
import { useState, useEffect } from "react";

import Image from "next/image";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { Video, VideoSkeleton } from "./video";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { cn } from "@/lib/utils";
import { Chat } from "./chat";
import { ChatToggle } from "./chat-toggle";
import { Header, HeaderSkeleton } from "./header";
import { InfoCard } from "./info-card";
import { AboutCard } from "./about-card";
import { VideoPreview } from "./video-preview";

type CustomStream = {
  id: string;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  isLive: boolean;
  thumbnailUrl: string | null;
  name: string;
};

type CustomUser = {
  id: string;
  externalUserId: string;
  username: string;
  bio: string | null;
  stream: CustomStream | null;
  imageUrl: string;
  _count: { followedBy: number };
};

interface StreamPlayerProps {
  user: CustomUser;
  stream: CustomStream;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);

  // Zustand store
  const collapsed = useChatSidebar((state) => state.collapsed);
  const onCollapse = useChatSidebar((state) => state.onCollapse);
  const onExpand = useChatSidebar((state) => state.onExpand);

  const [tab, setTab] = useState<"home" | "about" | "videos" | "chat">("home");

  // On desktop, collapse chat sidebar automatically when leaving chat tab
 useEffect(() => {
  if (window.innerWidth >= 1024) {
    if (tab === "chat") {
      onExpand();  // Expand chat sidebar when entering chat tab
    } else if (!collapsed) {
      onCollapse(); // Collapse chat sidebar when leaving chat tab
    }
  }
}, [tab, collapsed, onCollapse, onExpand]);


  if (!token || !name || !identity) {
    return <StreamPLayerSkeleton />;
  }

  const isDesktop = window.innerWidth >= 1024;
  const showChat = tab === "chat";
  console.log("Passed to VideoPreview:", { username: user.username, identity });


  return (
    <>
      {/* Chat toggle button only on desktop and chat tab */}
      {collapsed && isDesktop && showChat && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}

      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          isDesktop && collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        {/* Main content area */}
        <div
          className={cn(
            "space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10 h-full bg-white dark:bg-zinc-700"
          )}
        >
          <div className="relative w-full h-[400px] bg-black rounded-md overflow-hidden">
            <Image
              src="/background.jpg"
              alt="Stream Thumbnail"
              className="w-full h-full object-cover"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
            <div
              className="absolute top-20 left-5 bottom-20 right-60 rounded-md overflow-hidden border border-white/10 shadow-lg bg-black"
              style={{ width: 320, height: 180 }}
            >
              <Video hostName={user.username} hostIdentity={user.id} />
            </div>
          </div>

          <Header
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
            streamId={stream.id}
          />

          {/* Tabs */}
          <div className="px-4 border-b border-muted">
            <div className="flex space-x-4 text-sm font-medium">
              {["home", "about", "videos", "chat"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t as "home" | "about" | "videos" | "chat")}
                  className={cn(
                    "py-2 px-3 border-b-2 transition",
                    tab === t
                      ? "border-black dark:border-white text-black dark:text-white"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content on mobile and below main content */}
          <div className="px-4">
            {tab === "home" && (
              <div className="text-muted-foreground text-sm py-4">
                {/* Empty for now */}
              </div>
            )}

            {tab === "about" && (
              <div className="space-y-4 py-4">
                <InfoCard
                  hostIdentity={user.id}
                  viewerIdentity={identity}
                  name={stream.name}
                  thumbnailUrl={stream.thumbnailUrl}
                />
                <AboutCard
                  hostName={user.username}
                  hostIdentity={user.id}
                  viewerIdentity={identity}
                  bio={user.bio}
                  followedByCount={user._count.followedBy}
                />
              </div>
            )}

            {tab === "videos" && (
                <div>
                    <VideoPreview username={user.id} viewerIdentity={identity}  />
                </div>
                
            )}

            {/* On mobile, show chat inside tab content (below others) */}
            {tab === "chat" && !isDesktop && (
              <div className="py-4">
                <Chat
                  viewerName={name}
                  hostName={user.username}
                  hostIdentity={user.id}
                  isFollowing={isFollowing}
                  isChatEnabled={stream.isChatEnabled}
                  isChatDelayed={stream.isChatDelayed}
                  isChatFollowersOnly={stream.isChatFollowersOnly}
                />
              </div>
            )}
          </div>
        </div>

        {/* Desktop chat sidebar */}
        {isDesktop && showChat && !collapsed && (
          <div className="col-span-1 lg:block bg-white dark:bg-zinc-700 border-l border-muted overflow-y-auto hidden-scrollbar h-full">
            <Chat
              viewerName={name}
              hostName={user.username}
              hostIdentity={user.id}
              isFollowing={isFollowing}
              isChatEnabled={stream.isChatEnabled}
              isChatDelayed={stream.isChatDelayed}
              isChatFollowersOnly={stream.isChatFollowersOnly}
            />
          </div>
        )}
      </LiveKitRoom>
    </>
  );
};

export const StreamPLayerSkeleton = () => {
  return (
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
  );
};
