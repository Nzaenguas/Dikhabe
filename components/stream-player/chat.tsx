"use client";

import { useMemo, useState } from "react";
import { ConnectionState } from "livekit-client";
import { 
    useChat,
    useConnectionState, 
    useRemoteParticipant 
} from "@livekit/components-react";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";

import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";

interface ChatProps {
    hostName: string;
    hostIdentity: string;
    viewerName: string;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
};

export const Chat = ({
    hostName,
    hostIdentity,
    viewerName,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly,

}: ChatProps) => {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);

    const isOnline = participant && connectionState === ConnectionState.Connected;

    const isHidden = !isChatEnabled || !isOnline;

    const [value, setValue] = useState("");
    const { chatMessages: messages, send } = useChat();

    const reversedMessages = useMemo(() => {
        return messages.sort((a,b) => b.timestamp - a.timestamp);
    }, [messages]);

    const onSubmit = () => {
        if(!send) return;

        send(value);
        setValue("");
    };

    const onChange = (value: string) => {
        setValue(value);
    };

    const variant = useChatSidebar(state => state.variant);

    // Removed all expand/collapse toggle and related useEffect

    return (
        <div className="flex flex-col borber-1 border-b pt-0 h-[calc(100vh-80px)] bg-black">
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
                <>
                    <ChatList 
                        messages={reversedMessages}
                        isHidden={isHidden}
                    />
                    <ChatForm
                        onSubmit={onSubmit}
                        value={value}
                        onChange={onChange}
                        isHidden={isHidden}
                        isFollowersOnly={isChatFollowersOnly}
                        isDelayed={isChatDelayed}
                        isFollowing={isFollowing}
                    />
                </>
            )}
            {variant === ChatVariant.COMMUNITY && (
               <ChatCommunity 
                viewerName={viewerName}
                hostName={hostName}
                isHidden={isHidden}
               />
            )}
        </div>
    )
}

export const ChatSkeleton = () => {
    return (
        <div className="flex flex-col border-l border-b border-white/5 pt-0 h-[calc(100vh-80px)] border-2">
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div>
    )    
}
