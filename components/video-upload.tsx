"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface VideoUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadSuccess: (id: string, url: string, name: string) => void;
}

export function VideoUploadDialog({
  open,
  onOpenChange,
  onUploadSuccess,
}: VideoUploadDialogProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setIsUploading(true);
    setError("");

    const form = e.target as HTMLFormElement;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      setError("Please select a video file.");
      setIsUploading(false);
      return;
    }

    if (!file.type.startsWith("video/")) {
      setError("Only video files are allowed.");
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    try {
      const res = await fetch("/api/cloudinary", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      onUploadSuccess(data.id, data.url, name);
      onOpenChange(false);
      setName("");
      setSelectedFileName("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsUploading(false);
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Upload a new video</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Enter video name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
            required
          />

          {/* Hidden file input */}
          <input
            type="file"
            name="file"
            accept="video/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            required
          />

          {/* Visible text input for selected file name */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={selectedFileName}
              placeholder="No file selected"
              readOnly
              className="flex-grow border rounded px-3 py-2 text-sm"
            />
            <Button type="button" onClick={handleBrowseClick}>
              Browse
            </Button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
