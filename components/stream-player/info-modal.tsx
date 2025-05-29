"use client";

import {
  useState,
  useTransition,
  useRef
} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { Hint } from "@/components/hint";
import { Trash } from "lucide-react";
import Image from "next/image";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
};

export const InfoModal = ({
  initialName,
  initialThumbnailUrl
}: InfoModalProps) => {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
  const [uploadKey, setUploadKey] = useState(0);

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success("Thumbnail removed");
          setThumbnailUrl("");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"))
    })
  }

  const onSubmit =(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success("Stream updated");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"))
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className="ml-auto"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent 
        aria-describedby="dialog-desc"
        className="bg-black"
      
      >
        <DialogHeader>
          <DialogTitle>
            Edit stream info
          </DialogTitle>
          <DialogDescription id="dialog-desc" >
            Update your stream name and thumbnail here.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={onSubmit}
          className="space-y-14"
        >
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              disabled={isPending}
              placeholder="Stream name"
              onChange={onChange}
              value={name}
            />
          </div>
          <div className="space-y-2">
            <Label>
              Thumbnail
            </Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint
                    label="Remove thumbnail"
                    asChild
                    side="left"
                  >
                   <Button
                    type="button"
                    disabled={isPending}
                    onClick={onRemove}
                    className="h-auto w-auto p-1.5"
                   >
                      <Trash className="h-4 w-4" />
                   </Button>
                  </Hint>
                </div>
                <Image 
                  alt="Thumbnail"
                  src={thumbnailUrl}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
            <div className="rounded-xl border outline-dashed outline-muted">
              <UploadDropzone
                key={uploadKey}
                endpoint="thumbnailUploader"
                appearance={{
                  label: { color: "#FFFFFF" },
                  allowedContent: { color: "#FFFFFF" }
                }}
                onClientUploadComplete={(res) => {
                  const url = res?.[0]?.ufsUrl;
                  console.log("Uploaded URL:", url);

                  if (url) {
                    setThumbnailUrl(url);
                    toast.success("Thumbnail uploaded");

                    setUploadKey((prev) => prev + 1);

                    setTimeout(() => {
                      closeRef?.current?.click();
                      router.refresh();
                    });
                  } else {
                    toast.error("Upload failed: No URL returned");
                  }
                }}
                onUploadError={(error) => {
                  toast.error(`Upload error: ${error.message}`);
                  setUploadKey((prev) => prev + 1);
                }}
              />
            </div>
            )}
          </div>
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button
                type="button"
                variant="ghost"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isPending}
              variant="primary"
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
