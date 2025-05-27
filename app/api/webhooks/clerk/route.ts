import { NextRequest } from 'next/server';
import { Webhook } from 'svix';
import type { WebhookEvent, UserJSON } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { resetIngresses } from '@/actions/ingress';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    return new Response('Missing Clerk webhook secret', { status: 500 });
  }

  const svixId = req.headers.get('svix-id');
  const svixTimestamp = req.headers.get('svix-timestamp');
  const svixSignature = req.headers.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing Svix headers', { status: 400 });
  }

  const body = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;

      console.log("📦 Clerk Webhook Event:", JSON.stringify(evt, null, 2));

  } catch (err) {
    console.error('Webhook verification failed:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  const eventType = evt.type;
  const data = evt.data as UserJSON;

  try {
    if (eventType === 'user.created') {
      const username = data.username ?? `user-${data.id.slice(-6)}`;

      await db.user.create({
        data: {
          externalUserId: data.id,
          username,
          imageUrl: data.image_url,
          stream: {
            create: {
              name: `${username}'s stream`,
            },
          },
        },
      });

      console.log(`✅ User created: ${username}`);
    }

    if (eventType === 'user.updated') {
      const username = data.username ?? `user-${data.id.slice(-6)}`;

      await db.user.update({
        where: { externalUserId: data.id },
        data: {
          username,
          imageUrl: data.image_url,
        },
      });

      console.log(`🔁 User updated: ${username}`);
    }

  if (eventType === 'user.deleted') {
    await resetIngresses(data.id);
  console.log(`Attempting to delete user with externalUserId: ${data.id}`);

  try {
    const deleted = await db.user.deleteMany({
      where: { externalUserId: data.id },
    });
    console.log(`Deleted count: ${deleted.count}`);
  } catch (deleteError) {
    console.error('Error deleting user:', deleteError);
    throw deleteError; 
  }

  console.log(`🗑️ User deleted: ${data.id}`);
}

    return new Response('Webhook handled successfully', { status: 200 });
  } catch (err: any) {
    console.error('❌ Error handling webhook:', err);
    return new Response('Internal server error', { status: 500 });
  }
}
