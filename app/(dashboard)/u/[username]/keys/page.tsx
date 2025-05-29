import { UrlCard } from "./_components/url-card";
import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { KeyCard } from "./_components/key-card";
import Stream from "stream";
import { ConnectModal } from "./_components/connect-modal";

const KeysPage = async () => {
    const self = await getSelf();
    const stream = await getStreamByUserId(self.id);

    if(!stream){
        throw new Error("Stream not Found");
    }

    return (
        <div className="p-6 h-full bg-zinc-700">
            <div className="flex items-center justify-between mb-4">
                    <h1 className="test-2xl font-bold">
                    Keys
                </h1>
                <ConnectModal />
            </div>
            <div className="space-y-4 ">
                <UrlCard value={stream.serverUrl} />
                <KeyCard value={stream.streamKey} />
            </div>
        </div>
    );
};

export default KeysPage;