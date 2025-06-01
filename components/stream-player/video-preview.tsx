"use client";

import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2 } from "lucide-react";
import { VideoUploadDialog } from "@/components/video-upload";

interface Video {
  id: string;
  url: string;
  name?: string;
  user?: { username: string };
  isPlaying?: boolean;
}

interface VideoPreviewProps {
  username: string;
  viewerIdentity: string;
  currentVideoId?: string;
}

export function VideoPreview({ username, viewerIdentity, currentVideoId }: VideoPreviewProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const isHost = viewerIdentity === `host-${username}`;

  useEffect(() => {
    async function fetchVideos() {
      try {
        const cached = sessionStorage.getItem(`videos_${username}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          setVideos(parsed);
          console.log("Cached videos:", parsed);
          return;
        }

        const res = await fetch(`/api/videos?username=${username}`);
        if (!res.ok) throw new Error("Failed to fetch videos");

        let data: Video[] = await res.json();
        console.log("Fetched videos:", data);

        if (currentVideoId) {
          data = data.filter((video) => video.id !== currentVideoId);
        }

        const withState = data.map((video) => ({ ...video, isPlaying: false }));
        setVideos(withState);
        console.log("Set videos state:", withState);
        sessionStorage.setItem(`videos_${username}`, JSON.stringify(withState));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }

    fetchVideos();
  }, [username, currentVideoId]);


  const handleUploadSuccess = (id: string, url: string, name?: string) => {
    const newVideo: Video = {
      id,
      url,
      name: name ?? `Video ${videos.length + 1}`,
      user: { username },
      isPlaying: false,
    };

    setVideos((prev) => {
      const updated = [newVideo, ...prev];
      sessionStorage.setItem(`videos_${username}`, JSON.stringify(updated));
      return updated;
    });
  };

  const togglePlayback = (videoId: string) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === videoId ? { ...video, isPlaying: !video.isPlaying } : video
      )
    );
  };

  const handleDelete = async (videoId: string) => {
    console.log("Deleting video with ID:", videoId);

    if (!confirm("Are you sure you want to delete this video?")) return;

    setIsDeleting(videoId);

    try {
      const res = await fetch(`/api/videos/${videoId}`, { method: "DELETE" });
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Failed to delete video: ${errorData.error || "Unknown error"}`);
        return;
      }

      setVideos((prev) => {
        const updated = prev.filter((v) => v.id !== videoId);
        sessionStorage.setItem(`videos_${username}`, JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("An error occurred while deleting the video.");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div>
      {isHost && (
        <div className="flex justify-end mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Options">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setIsUploadDialogOpen(true)}>
                Upload Video
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {videos.length === 0 ? (
        <p className="text-muted-foreground text-center">No videos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {videos.map(({ id, url, name, isPlaying }, idx) => { 
            console.log("Video ID:", id, "Name:", name);
            return(            
            <div
              key={id}
              className="relative border rounded p-2 bg-white/10 dark:bg-black cursor-pointer"
              onClick={() => togglePlayback(id)}
              title={name ?? `Video ${idx + 1}`}
            >
              <video
                src={url}
                controls={isPlaying}
                autoPlay={isPlaying}
                muted={!isPlaying}
                className="rounded w-full object-cover aspect-video"
              />

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 truncate">
                {name ?? `Video ${idx + 1}`}
              </p>

              {isHost && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Deleting video with ID:", id, "Name:", name);
                    handleDelete(id);
                  }}
                  disabled={isDeleting === id}
                  className={`absolute top-2 right-2 p-1 rounded text-white ${
                    isDeleting === id
                      ? "bg-red-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          )})}
        </div>
      )}

      <VideoUploadDialog
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onUploadSuccess={(id, url, name) => {
          if (!id) {
            console.error("Upload missing video ID");
            return;
          }
          handleUploadSuccess(id, url, name);
        }}
      />
    </div>
  );
}
