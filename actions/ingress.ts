"use server";

import {
    AudioCodec,
    VideoCodec,
    IngressInput,
    IngressClient,
    RoomServiceClient,
    IngressAudioOptions,
    IngressVideoOptions,
    TrackSource,
    type CreateIngressOptions,
   

} from "livekit-server-sdk";

import { db } from "@/lib/db";

import { getSelf } from "@/lib/auth-service";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngresses = async (hostIdentity: string) => {
    const ingresses = await ingressClient.listIngress({
        roomName: hostIdentity,
    });

    const rooms = await roomService.listRooms([hostIdentity]);
    for(const room of rooms) {
        await roomService.deleteRoom(room.name);
    }

    for (const ingress of ingresses) {
        if (ingress.ingressId) {
            await ingressClient.deleteIngress(ingress.ingressId);
        }
    }
};

export const createIngress = async (ingressType: IngressInput) => {
  const self = await getSelf();

  await resetIngresses(self.id);

  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.audio = {
      codec: AudioCodec.OPUS,
    } as any;

    options.video = {
      codec: VideoCodec.H264_BASELINE,
    } as any;
  } else {
    options.audio = new IngressAudioOptions({
      name: "audio",
      source: TrackSource.MICROPHONE,
    });

    options.video = new IngressVideoOptions({
      name: "video",
      source: TrackSource.CAMERA,
    });
  }

  async function safeCreateIngress(retries = 3, delayMs = 3000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const ingress = await ingressClient.createIngress(ingressType, options);
        return ingress;
      } catch (error: any) {
        if (error.status === 429) {
          if (attempt === retries) {
            throw new Error(
              `Ingress quota exceeded after ${retries} attempts. Please check your LiveKit plan limits.`
            );
          }
          console.warn(`Ingress quota exceeded, retrying in ${delayMs}ms (attempt ${attempt})...`);
          await new Promise((res) => setTimeout(res, delayMs));
        } else {
          throw error;
        }
      }
    }
  }

  const ingress = await safeCreateIngress();

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Failed to create ingress");
  }

  await db.stream.update({
    where: { userId: self.id },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  });

  revalidatePath(`/u/${self.username}/key`);
};
