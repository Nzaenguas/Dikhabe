import { Buffer } from "buffer";
import { WebhookReceiver } from "livekit-server-sdk";
import { db } from "@/lib/db";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!.trim(),
  process.env.LIVEKIT_API_SECRET!.trim()
);

export async function POST(req: Request) {

  const authorization = req.headers.get("authorization");
  const contentLength = Number(req.headers.get("content-length") || 0);

  if (contentLength === 0 || !authorization) {
    return new Response("OK", { status: 200 });
  }

  const arrayBuffer = await req.arrayBuffer();
  const rawBodyBuf = Buffer.from(arrayBuffer);

  let event;
  try {
    event = await receiver.receive(
      rawBodyBuf as unknown as string,
      authorization,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    if (event.event === "ingress_started") {
      await db.stream.update({
        where: { ingressId: event.ingressInfo?.ingressId },
        data: { isLive: true },
      });
    } else if (event.event === "ingress_ended") {
      await db.stream.update({
        where: { ingressId: event.ingressInfo?.ingressId },
        data: { isLive: false },
      });
    }
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("DB update failed:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
