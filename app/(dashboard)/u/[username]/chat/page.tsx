import { getSelf } from '@/lib/auth-service';
import { getStreamByUserId } from '@/lib/stream-service';
import { ToggleCard } from './_components/toggle-card';
const ChatPage = async () => {
    const self = await getSelf();
    const stream = await getStreamByUserId(self.id);

    if (!stream) {
        throw new Error("Stream not found");
    }

    return (
        <div className="p-6 h-full bg-white dark:bg-zinc-700">
            <div className="mb-4">
                <h1 className="test-2xl font-bold">
                    chat settings
                </h1>
            </div>
            <div className="space-y-4">
                <ToggleCard
                field="isChatEnabled"
                label="Enabled chat"
                value={stream.isChatEnabled}
                />
                <ToggleCard
                field="isChatDelayed"
                label="Delay Chat"
                value={stream.isChatDelayed}
                />
                <ToggleCard
                field="isChatFollowersOnly"
                label="Follow to Chat"
                value={stream.isChatFollowersOnly}
                />
            </div>
        </div>
    );
};

export default ChatPage;