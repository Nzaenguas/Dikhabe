"use client";
import { useState } from "react";

interface VideoUploadProps {
  hostIdentity: string;
  viewerIdentity: string;
}

export function VideoUpload({ hostIdentity, viewerIdentity }: VideoUploadProps) {
  const [videoUrl, setVideoUrl] = useState("");
  const isHost = viewerIdentity === `host-${hostIdentity}`;

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setVideoUrl(data.url);
  }

  if (!isHost) {
    return (
      <div className="text-sm text-muted-foreground font-bold p-4">
        Videos..
      </div>
    );
  }

  return (
    <div className="py-4 space-y-4">
      <form onSubmit={handleUpload} className="flex flex-col gap-2">
        <input type="file" name="file" accept="video/*" required />
        <button type="submit" className="btn-primary w-fit">
          Upload Clip
        </button>
      </form>
      {videoUrl && (
        <div className="border rounded p-2 bg-gray-50 dark:bg-gray-800">
          <video
            src={videoUrl}
            controls
            controlsList="nodownload"
            disablePictureInPicture
            width={600}
            className="rounded"
          />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Uploaded video preview
          </p>
        </div>
      )}
    </div>
  );
}
