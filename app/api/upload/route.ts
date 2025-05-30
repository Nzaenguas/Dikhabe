import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest): Promise<Response> {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const stream = Readable.from(buffer);

  return new Promise<Response>((resolve) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'video' },
      (error, result) => {
        if (error || !result) {
          resolve(
            NextResponse.json(
              { error: error?.message ?? 'Upload failed' },
              { status: 500 }
            )
          );
          return;
        }
        resolve(
          NextResponse.json(
            { url: result.secure_url },
            { status: 200 }
          )
        );
      }
    );

    stream.pipe(uploadStream);
  });
}
